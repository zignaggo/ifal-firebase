import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import theme from "./config/theme"
import App from "./App"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyBXRzUJhSjMocoKTXL5VLZfheqZyST7cko",
	authDomain: "final-project-5d60e.firebaseapp.com",
	databaseURL: "https://final-project-5d60e-default-rtdb.firebaseio.com",
	projectId: "final-project-5d60e",
	storageBucket: "final-project-5d60e.appspot.com",
	messagingSenderId: "1056418164863",
	appId: "1:1056418164863:web:02be48699c145df1c28f4a",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
