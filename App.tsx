import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { AppStackNavigator } from "./src/routes"
import firebaseConfig from "./firebase.json"
import { AuthProvider } from "./src/Contexts/AuthProvider/AuthContext"
import { NativeBaseProvider } from "native-base"

export const app = initializeApp(firebaseConfig)
export const Auth = getAuth(app)



export default function App() {
	return (
		<NativeBaseProvider>
			<AuthProvider>
				<AppStackNavigator />
			</AuthProvider>
		</NativeBaseProvider>
	)
}
