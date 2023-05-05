import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { AppStackNavigator } from "./src/routes"
import firebaseConfig from "./firebase.json"
import { AuthProvider } from "./src/Contexts/AuthProvider/AuthContext"
import { NativeBaseProvider } from "native-base"
import { theme } from "./src/config/theme"
export const app = initializeApp(firebaseConfig)
export const Auth = getAuth(app)

export default function App() {
	return (
		<NativeBaseProvider theme={theme}>
			<AuthProvider>
				<AppStackNavigator />
			</AuthProvider>
		</NativeBaseProvider>
	)
}
