import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { MainNavigation } from "./src/routes"
import firebaseConfig from "./firebase.json"
import { AuthProvider } from "./src/Contexts/AuthProvider/AuthContext"
import { NativeBaseProvider, extendTheme } from "native-base"
import { theme } from "./src/config/theme"
import "react-native-gesture-handler"
export const app = initializeApp(firebaseConfig)
export const Auth = getAuth(app)

export default function App() {
	const inset = {
		frame: { x: 0, y: 0, width: 0, height: 0 },
		insets: { top: 0, left: 0, right: 0, bottom: 0 },
	}
	return (
		<NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
			{
				<AuthProvider authApp={Auth}>
					<MainNavigation />
				</AuthProvider>
			}
			
		</NativeBaseProvider>
	)
}
