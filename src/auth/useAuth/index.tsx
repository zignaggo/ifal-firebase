import { createUserWithEmailAndPassword } from "@firebase/auth"
import { ReactNode, createContext, useContext, useState } from "react"
import { auth } from "../../main"
interface User {
	name: string
	email: string
	cpf: string
	uid: string
}

type TypeAuthContext = {
	user: Partial<User>
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<TypeAuthContext>({} as TypeAuthContext)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<Partial<User>>({})

	async function login(email: string, password: string) {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		setUser(
			(prev) =>
				prev && {
					...prev,
					uid: user.uid,
					email: email,
				}
		)
	}

	function logout() {}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
