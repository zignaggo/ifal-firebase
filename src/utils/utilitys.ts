import * as SecureStore from "expo-secure-store"
import {
	getFirestore,
	getDoc,
	setDoc,
	doc,
} from "firebase/firestore"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { verifyError } from "./errorcodes";

export interface UserData {
	name: string
	email: string
	image: string
	uid: string
}

export async function saveOnStorage(key: string, value: string) {
	try {
		await SecureStore.setItemAsync(key, value)
	} catch (error) {
		console.log(verifyError(error))
	}
}

export async function getValueStorage(key: string) {
	try {
		const result = await SecureStore.getItemAsync(key)
		return result
	} catch (error) {
		console.log(verifyError(error))
	}
	return ""
}

export async function saveDataOnFirestore({uid, email, image, name}: UserData) {
	try {
		await setDoc(doc(getFirestore(), "Users", uid), {
			name: name,
			email: email,
			image: image,
		})

		console.log("Cadastrado")
	} catch (error) {
		console.log(verifyError(error))
	}
}

export async function getDataFirebase(uid: string) {
	try {
		return await getDoc(doc(getFirestore(), "Users", uid))
	} catch (error) {
		console.log(verifyError(error))
	}
}


export async function uploadImageToStorage(uri: string, uid: string) {
	try {
		const storage = getStorage()
		const storageRef = ref(storage, `image-profile-${uid}`)

		await uploadString(storageRef, uri, 'data_url')
	} catch (error) {
		console.log(verifyError(error))
	}
}

export async function getUrlImage(uid: string) {
	const storage = getStorage()
	const imageRef = ref(storage, `image-profile-${uid}`)
	const response = await getDownloadURL(imageRef)
	
	return response
}