import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updatePassword,
	sendPasswordResetEmail,
	Auth,
} from "firebase/auth"
import { verifyError, errors } from "./errorcodes"
import firebaseConfig from "./firebase.json"
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const createUser = (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => console.log(`user: ${userCredential}`))
		.catch((erro) => console.log(verifyError(erro)))
}

//Login do usuário
const loginUser = (email: string, password: string, auth: Auth) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((situation) => console.log(`User ${situation.user} logged in`))
		.catch((erro) => console.log(verifyError(erro)))
}

//Recuperar/alterar senha
const recoverPassword = (email: string) => {
	sendPasswordResetEmail(auth, email)
		.then(() => console.log("Email sent"))
		.catch((erro) => console.log(verifyError(erro)))
}

//Verificar email (Não entendi o que o Flávio quis dizer)

//Atualizar foto do perfil do usuário
const updateUserImage = () => {}

//Na tela de perfil, aparecer se o email está verificado ou não
const [user, setUser] = useState(auth.currentUser)

useEffect(() => {
	const unsubscribe = onAuthStateChanged(auth, (userStatus) => {
		setUser(userStatus)
	})

	return unsubscribe
}, [])
