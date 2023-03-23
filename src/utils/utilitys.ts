import * as SecureStore from "expo-secure-store"

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
