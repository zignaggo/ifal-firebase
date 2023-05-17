import { getFirestore, getDoc, setDoc, doc, Firestore, collection } from "firebase/firestore"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import { verifyError } from "./errorcodes"

export interface UserData {
	name: string
	email: string
	cpf: string
}

export async function saveDataOnFirestore(uid: string, {
	email,
	name,
	cpf
}: UserData) {
	try {
		return await setDoc(doc(getFirestore(), "Users", uid), {
			name: name,
			email: email,
			cpf: cpf
		})
	} catch (error) {
		console.log(verifyError(error.code))
	}
}

export async function getDataFirebase(bancoRef: Firestore, colecao: string, documento: string) {
	try {
		let info = await getDoc(doc(bancoRef, colecao, documento))
		return info.data()
	} catch (error) {
		return console.log(error.code)
	}
}


export async function uploadImageToStorage(uri: string, uid: string) {
	try {
		const storage = getStorage()
		const storageRef = ref(storage, `image-profile-${uid}`)
		return await uploadString(storageRef, uri, "data_url")
	} catch (error) {
		console.log(verifyError(error))
	}
}

export async function getUrlImage(uid: string) {
	const storage = getStorage()
	const imageRef = ref(storage, `image-profile-${uid}`)
	return await getDownloadURL(imageRef)
}
