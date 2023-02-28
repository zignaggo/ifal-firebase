import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { AppStackNavigator } from "./src/routes"
import firebaseConfig from "./firebase.json"
export const app = initializeApp(firebaseConfig)
export const Auth = getAuth(app)

export default function App() {
	return <AppStackNavigator />
}
