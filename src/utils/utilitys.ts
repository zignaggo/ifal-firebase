import { getFirestore, getDoc, doc, Firestore } from "firebase/firestore"
import { verifyError } from "./errorCodes"

export interface UserData {
	name: string,
	email: string,
	cpf: string
}

export interface ResponseSubject {
  n1: number,
  n2: number, 
  rep: number, 
  final: number, 
  media: number
}

export async function getDataFirebase(bancoRef: Firestore, colecao: string, documento: string) {
	try {
		let info = await getDoc(doc(bancoRef, colecao, documento))
		return info.data()
	} catch (error) {
		console.log(verifyError(error.code))
	}
}

export async function getSubjectInfo(name: string, uid: string): Promise<ResponseSubject> {
	try {
		const data = await getDoc(doc(getFirestore(), `Disciplinas/${name}/Discentes/${uid}`))
		return data.data() as ResponseSubject
	} catch (error) {
		console.log(error.code)
	}
}