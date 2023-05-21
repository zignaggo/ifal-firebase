import { getFirestore, getDoc, doc, Firestore, collection, query, getDocs, DocumentData } from "firebase/firestore"
import { FirebaseError } from 'firebase/app'
import { verifyError } from "./errorCodes"
import { toast } from 'react-hot-toast'

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
	nome: string,
	cpf: string,
	photoUrl: string
}

export async function getDataFirebase(colecao: string, documento: string): Promise<DocumentData | void> {
	try {
		let info = await getDoc(doc(getFirestore(), colecao, documento))
		return info.data()
	} catch (error) {
		if (error instanceof FirebaseError) {
			toast.error(`Erro: ${verifyError(error.code)}`)
			return
		}
	}
}

export interface responseGetDiscentes {id: string, info: ResponseSubject }

export async function getDiscentes(name: string): Promise<any[] | void> {
	try {
		const q = query(collection(getFirestore(), `Disciplinas/${name}/Discentes`))
		const docs = await getDocs(q)
		let data: responseGetDiscentes[] = []
		docs.forEach(doc => { 
			const info = doc.data() as ResponseSubject
			data = [...data, {id: doc.id, info: info}]
	})
		return data
		 
	} catch (error) {
		if (error instanceof FirebaseError) {
			toast.error(`Erro: ${verifyError(error.code)}`)
			return
		}
	}
}

export async function getUsersData() {

}