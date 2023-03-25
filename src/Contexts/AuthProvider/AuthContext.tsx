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
} from "firebase/auth"
import { Auth as AuthApp } from "../../../App"
import { verifyError } from "../../utils/errorcodes"
import { collection, getFirestore } from "firebase/firestore"
import { Alert } from "react-native"
import { getDataFirebase, saveDataOnFirestore } from "../../utils/utilitys"

export interface UserData {
	name: string
	email: string
	verified?: boolean
	uid?: string
	phone?: number
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
}

export interface IAuthProvider {
	children: JSX.Element
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
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
				AuthApp,
				email,
				password
			)
			await updateProfile(user, { displayName: name })
			setUser({
				name: user.displayName,
				email: user.email,
				verified: user.emailVerified,
				uid: user.uid,
			})
			saveDataOnFirestore({
				email: user.email,
				name: user.displayName,
				uid: user.uid,
				phone: -1,
			})
			action()
		} catch (error) {
			Alert.alert(verifyError(error.code))
			console.log(error.code)
		} finally {
			setLoading(false)
		}
	}

	//Login do usuario
	async function login(
		email: string,
		password: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
			setLoading(true)
			const response = await signInWithEmailAndPassword(
				AuthApp,
				email,
				password
			)
			console.log(response)
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
			console.log(error.code)
		} finally {
			setLoading(false)
		}
	}

	function logout() {
		signOut(AuthApp)
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
			setUser({...user, email: data.email, name: data.name, phone: data.phone })
		}
	}

	//Recuperar/alterar senha
	async function recoverPassword(
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
			setLoading(true)
			await sendPasswordResetEmail(AuthApp, email)
			Alert.alert("Email Enviado")
			action()
		} catch (error) {
			Alert.alert(verifyError(error.code))
			console.log(error.code)
		} finally {
			setLoading(false)
		}
	}

	// Verificar email
	async function verifyEmail() {
		try {
			sendEmailVerification(AuthApp.currentUser)
		} catch (error) {
			Alert.alert(verifyError(error.code)),
			console.log(error.code)
		}
	}

	useEffect(() => {
		const subscriber = onAuthStateChanged(AuthApp, (user) => {
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
				verifyEmail
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
