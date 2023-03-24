import * as SecureStore from "expo-secure-store"
import {
	collection,
	getFirestore,
	getDoc,
	setDoc,
	doc,
} from "firebase/firestore"

export interface UserData {
	name: string
	email: string
	phone: number
	uid: string
}

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

export async function saveDataOnFirestore(data: UserData) {
	try {
		await setDoc(doc(getFirestore(), "Users", data.uid), {
			name: data.name,
			email: data.email,
			phone: data.phone,
		})

		console.log("Cadastrado")
	} catch (error) {
		console.log(error)
	}
}

export async function getDataFirebase(uid: string) {
	try {
		return await getDoc(doc(getFirestore(), "Users", uid))
	} catch (error) {
		console.log(error)
	}
}

export async function verifyEmail() {

}