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
	Auth,
	sendPasswordResetEmail,
} from "firebase/auth"
import { Auth as AuthApp } from "../../../App"
import { verifyError } from "../../utils/errorcodes"
import { collection, getFirestore } from "firebase/firestore"
import { Alert } from "react-native"

export interface UserData {
	name: string
	email: string
	verified: boolean
	id: string
	token?: string
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
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
	onStateChanged: (user: UserData) => void
	loadData: () => void
	recoverPassword: (
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) => Promise<void>
}

export interface IAuthProvider {
	children: JSX.Element
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
	const [user, setUser] = useState<UserData>({} as UserData)

	async function createUser(
		email: string,
		password: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
			setLoading(true)
			const response = await createUserWithEmailAndPassword(
				AuthApp,
				email,
				password
			)
			console.log(`User ${response.user} logged in`)
			action()
		} catch (error) {
			Alert.alert(verifyError(error.code))
			console.log(error.code)
		} finally {
			setLoading(false)
		}
	}

	//Login do usuário
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
			setUser({
				...user,
				email: response.user.email,
				verified: response.user.emailVerified,
				id: response.user.uid,
				name: response.user.displayName,
			})
			console.log(`User ${response.user} logged in`)
			action()
		} catch (error) {
			Alert.alert(verifyError(error.code))
			console.log(error.code)
		} finally {
			setLoading(false)
		}
	}

	function logout() {}

	function onStateChanged(user: UserData) {
		setUser(user)
	}

	function loadData() {
		const response = collection(getFirestore(), "Users")
		console.log(response)
	}

	//Recuperar/alterar senha
	async function recoverPassword(
		email: string,
		action: () => void,
		setLoading: Dispatch<SetStateAction<boolean>>
	) {
		try {
            setLoading(true)
			const response = await sendPasswordResetEmail(AuthApp, email)
			Alert.alert("Email Enviado")
            action()
        } catch (error) {
			Alert.alert(verifyError(error.code))
            console.log(error.code)
        } finally {
            setLoading(false)
        }
	}

	useEffect(() => {
		const subscriber = onAuthStateChanged(
			AuthApp,
			({ displayName, email, emailVerified, uid }) =>
				onStateChanged({
					name: displayName,
					email: email,
					verified: emailVerified,
					id: uid,
				})
		)
		return subscriber // unsubscribe on unmount
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
                recoverPassword
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
