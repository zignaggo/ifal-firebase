import { signInWithEmailAndPassword } from "@firebase/auth"
import { ReactNode, createContext, useContext, useEffect } from "react"
import { auth } from "../../main"
import { useNavigate, useLocation } from "@tanstack/react-location"
import { useLocalStorage } from "../../hooks/useLocalStorage"
interface User {
	name: string
	email: string
	cpf: string
	uid: string
}

type TypeAuthContext = {
	user: Partial<User> | undefined
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<TypeAuthContext>({} as TypeAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser, reset] = useLocalStorage<Partial<User>>("glevson")
	const navigate = useNavigate()
	const {
		current: { pathname },
	} = useLocation()
	async function login(email: string, password: string) {
		const {
			user: { displayName, uid },
		} = await signInWithEmailAndPassword(auth, email, password)
		setUser((prev) => ({
			...prev,
			uid: uid,
			email: email,
			name: displayName || undefined,
		}))
		navigate({ replace: true, to: "/" })
	}

	function logout() {
		reset()
	}

	useEffect(() => {
		if (!user && pathname !== "/sign")
			navigate({ replace: true, to: "/sign" })
		if (pathname === "/sign" && user) navigate({ replace: true, to: "/" })
	}, [user, pathname])
	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
