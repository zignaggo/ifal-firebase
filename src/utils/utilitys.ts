import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	Auth,
} from "firebase/auth"
import { verifyError, errors } from "../../errorcodes"
import firebaseConfig from "../../firebase.json"
import * as SecureStore from "expo-secure-store"

// //Recuperar/alterar senha
// const recoverPassword = (email: string) => {
// 	sendPasswordResetEmail(auth, email)
// 		.then(() => console.log("Email sent"))
// 		.catch((erro) => console.log(verifyError(erro)))
// }

export async function saveOnStorage(key: string, value: string) {
	try {
		await SecureStore.setItemAsync(key, value)
	} catch (error) {
		console.log(error)
	}
}

export async function getValueStorage(key: string) {
	try {
		const result = await SecureStore.getItemAsync(key)
		return result
	} catch (error) {
		console.log(error)
	}
	return ""
}
