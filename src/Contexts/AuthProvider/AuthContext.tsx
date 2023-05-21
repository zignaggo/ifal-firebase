import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react"
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	sendEmailVerification,
	updateProfile,
	Auth,
	getAuth,
} from "firebase/auth"
import { verifyError } from "../../utils/errorcodes"
import { Alert } from "react-native"
import {
	getDataFirebase,
	getUrlImage,
	saveDataOnFirestore,
	updateImageFirestore,
	uploadImageToStorage,
} from "../../utils/utilitys"
import * as ImagePicker from "expo-image-picker"
import { getFirestore } from "firebase/firestore"
import { app } from "../../../firebase.config"

export interface CourseData {
	carga: number
	nivel: string
	nome: string
	periodo: number
	turno: string
}

export interface UserData {
	name: string
	email: string
	verified?: boolean
	image?: string
	uid?: string
	dados_curso?: CourseData
}

export interface IContext {
	user: UserData
	login: (
		email: string,
		password: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	logout: () => void
	createUser: (
		email: string,
		password: string,
		name: string,
		uid: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	loadData: () => Promise<void>
	recoverPassword: (
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	verifyEmail: () => Promise<string>
	imagePickerCall: () => void
	setImageProfile: () => Promise<void>
}

export interface IAuthProvider {
	children: JSX.Element
	authApp: Auth
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children, authApp }: IAuthProvider) => {
	const [user, setUser] = useState<UserData | null>(null)

	async function createUser(
		email: string,
		password: string,
		name: string,
		cpf: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
			setLoading(true)
			const { user } = await createUserWithEmailAndPassword(
				authApp,
				email,
				password
			)
			setUser({
				name: name,
				email: user.email,
				verified: user.emailVerified,
				uid: user.uid,
			})

			updateProfile(getAuth().currentUser, { displayName: name })
			saveDataOnFirestore(user.uid, {
				email: email,
				name: name,
				cpf: cpf,
				photoUrl: user.photoURL,
			})

			action()
		} catch (error) {
			Alert.alert(error)
			console.log(verifyError(error.code))
		} finally {
			setLoading(false)
		}
	}

	async function login(
		email: string,
		password: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
			setLoading(true)
			const response = await signInWithEmailAndPassword(
				authApp,
				email,
				password
			)
			setUser({
				...user,
				email: response.user.email,
				verified: response.user.emailVerified,
				uid: response.user.uid,
				name: response.user.displayName,
				image: response.user.photoURL,
			})
			action()
		} catch (error) {
			Alert.alert(verifyError(error.code))
			console.log(verifyError(error.code))
		} finally {
			setLoading(false)
		}
	}

	function logout() {
		signOut(authApp)
		setUser(null)
	}

	async function loadData() {
		if (!user?.uid) return
		// Promise.all([])
		const userDataResponse = (await getDataFirebase(
			getFirestore(),
			"Users",
			user.uid
		)) as UserData
		const dadosCursoResponse = (await getDataFirebase(
			getFirestore(),
			"Geral",
			"dados_curso"
		)) as CourseData
		if (userDataResponse && dadosCursoResponse) {
			setUser({
				...user,
				email: userDataResponse.email,
				name: userDataResponse.name,
				image: getAuth(app).currentUser.photoURL,
				dados_curso: {
					carga: dadosCursoResponse.carga,
					nome: dadosCursoResponse.nome,
					turno: dadosCursoResponse.turno,
					periodo: dadosCursoResponse.periodo,
					nivel: dadosCursoResponse.nivel,
				},
			})
		}
	}

	async function recoverPassword(
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		setLoading(true)
		await sendPasswordResetEmail(authApp, email)
			.catch((error) => console.log(verifyError(error)))
			.finally(() => setLoading(false))
	}

	async function verifyEmail() {
		try {
			return sendEmailVerification(authApp.currentUser).then(
				() => "Email enviado"
			)
		} catch (error) {
			Alert.alert(verifyError(error.code)), console.log(error.code)
		}
	}

	async function imagePickerCall() {
		try {
			const data = await ImagePicker.launchImageLibraryAsync({})
			await uploadImageToStorage(data.assets[0].uri, user.uid)
			console.log(user.uid)
			await setImageProfile()
			await loadData()
		} catch (error) {
			console.log(error.code)
		}
	}

	async function setImageProfile() {
		const response = await getUrlImage(user.uid)
		updateProfile(getAuth().currentUser, { photoURL: response })
		updateImageFirestore(user.uid, response)
	}

	useEffect(() => {
		const subscriber = onAuthStateChanged(authApp, (user) => {
			if (user)
				setUser({
					email: user.email,
					verified: user.emailVerified,
					name: user.displayName,
					uid: user.uid,
				})
		})
		return subscriber
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				createUser,
				loadData,
				recoverPassword,
				verifyEmail,
				imagePickerCall,
				setImageProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
