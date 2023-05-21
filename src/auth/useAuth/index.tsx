import { signInWithEmailAndPassword, signOut, getIdToken } from "@firebase/auth"
import { ReactNode, createContext, useContext, useEffect } from "react"
import { auth } from "../../main"
import { useNavigate, useLocation } from "@tanstack/react-location"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { toast } from "react-hot-toast"
import { FirebaseError } from "firebase/app"
import { verifyError } from "../../utils/errorCodes"
import { UseCookieStorage } from "../../hooks/useCookieStorage"
interface User {
	name: string
	email: string
	cpf: string
	uid: string
	photo: string
}

type TypeAuthContext = {
	user: Partial<User> | undefined
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<TypeAuthContext>({} as TypeAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser, reset] = useLocalStorage<Partial<User>>("data")
	const [sessionId, setSessionId, resetSession] = UseCookieStorage(
		"glevson",
		4
	)
	const navigate = useNavigate()
	const {
		current: { pathname },
	} = useLocation()
	async function login(email: string, password: string) {
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			setUser((prev) => ({
				...prev,
				uid: user.uid,
				email: email,
				name: user.displayName || undefined,
				photo: user.photoURL || undefined,
			}))
			const token = await getIdToken(user)
			console.log(token)
			setSessionId(token)
			navigate({ replace: true, to: "/" })
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				toast.error(`Erro: ${verifyError(error.code)}`)
				return
			}
			toast.error("Erro")
			console.log(error)
		}
	}

	function logout() {
		reset()
		signOut(auth)
		resetSession()
	}

	useEffect(() => {
		if (!sessionId && pathname !== "/sign")
			navigate({ replace: true, to: "/sign" })
		if (pathname === "/sign" && sessionId)
			navigate({ replace: true, to: "/" })
	}, [sessionId, pathname])
	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
