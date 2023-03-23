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
} from "firebase/auth"
import { Auth as AuthApp} from "../../../App"
import { verifyError } from "../../../errorcodes"
import { getValueStorage, saveOnStorage } from "../../utils/utilitys"
import { collection, getFirestore } from "firebase/firestore"
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
        auth: Auth,
        action: () => void,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => Promise<void>
    logout: () => void
    createUser: (
        email: string,
        password: string,
        action: () => void
    ) => Promise<void>
    onStateChanged: (user: UserData) => void
    loadData: () => void
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
        action: () => void
    ) {
        try {
            const response = await createUserWithEmailAndPassword(
                AuthApp,
                email,
                password
            )
            console.log(`User ${response.user} logged in`)
            action()
        } catch (error) {
            console.log(verifyError(error))
        }
    }

    //Login do usuário
    async function login(
        email: string,
        password: string,
        auth: Auth,
        action: () => void,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) {
        try {
            setLoading(true)
            const response = await signInWithEmailAndPassword(
                auth,
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
            // saveOnStorage("futurinhos", user.token)
            action()
        } catch (error) {
            console.log(verifyError(error))
        } finally {
            setLoading(false)
        }
    }

    function logout() { }

    function onStateChanged(user: UserData) {
        setUser(user)
    }

    function loadData() {
        const response = collection( getFirestore(), "Users")
        console.log(response)
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
            value={{ user, login, logout, createUser, onStateChanged, loadData }}
        >
            {children}
        </AuthContext.Provider>
    )
}
