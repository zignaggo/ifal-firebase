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
	User,
	Auth,
} from "firebase/auth"
import { verifyError } from "../../utils/errorcodes"
import { Alert } from "react-native"
import {
	getDataFirebase,
	getUrlImage,
	saveDataOnFirestore,
	uploadImageToStorage,
} from "../../utils/utilitys"
import * as ImagePicker from "expo-image-picker"
import { doc, Firestore, getFirestore, onSnapshot } from "firebase/firestore"

export interface UserData {
	name: string
	email: string
	verified?: boolean
	uid?: string
	image?: string
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
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	onStateChanged: (user: UserData) => void
	loadData: () => Promise<void>
	recoverPassword: (
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	verifyEmail: () => Promise<void>
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
			await updateProfile(user, { displayName: name })
			setUser({
				name: name,
				email: user.email,
				verified: user.emailVerified,
				uid: user.uid,
			})
			saveDataOnFirestore({
				email: user.email,
				name: name,
				uid: user.uid,
				image: "s",
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

	function onStateChanged(user: UserData) {
		setUser(user)
	}

	async function loadData() {
		if (!user.uid) return
		const response = await getDataFirebase(user.uid)
		if (!response) return
		const data = response.data() as UserData
		if (response && data) {
			setUser({
				...user,
				email: data.email,
				name: data.name,
				image: data.image,
			})
		}
	}

	const recoverPassword = async (
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => {
		setLoading(true)
		await sendPasswordResetEmail(authApp, email)
			.catch((error) => console.log(verifyError(error)))
			.finally(() => setLoading(false))
	}

	async function verifyEmail() {
		try {
			sendEmailVerification(authApp.currentUser)
		} catch (error) {
			Alert.alert(verifyError(error.code)), console.log(error.code)
		}
	}

	async function imagePickerCall() {
		try {
			const data = await ImagePicker.launchImageLibraryAsync({})
			await uploadImageToStorage(data.assets[0].uri, user.uid)
			await setImageProfile()
			await loadData()
		} catch (error) {
			console.log(error.code)
		}
	}

	async function setImageProfile() {
		const response = await getUrlImage(user.uid)
		saveDataOnFirestore({
			email: user.email,
			name: user.name,
			uid: user.uid,
			image: response,
		})
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
				onStateChanged,
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
