import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const config = {
	apiKey: "AIzaSyBXRzUJhSjMocoKTXL5VLZfheqZyST7cko",
  authDomain: "final-project-5d60e.firebaseapp.com",
  projectId: "final-project-5d60e",
  storageBucket: "final-project-5d60e.appspot.com",
  messagingSenderId: "1056418164863",
  appId: "1:1056418164863:web:02be48699c145df1c28f4a",
}

export const app = initializeApp(config)
export const auth = getAuth(app)
