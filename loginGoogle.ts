import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { Auth } from "firebase/auth/react-native"
import { verifyError } from "./src/utils/errorcodes"

export async function loginGoogle(authF: Auth, email: string) {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  
  signInWithRedirect(authF, provider.setCustomParameters({ 'login_hint': `${email}` }))
    .then(result => {
      console.log(result)
      const credential = GoogleAuthProvider.credentialFromResult(result)

    }).catch(error => {
      console.log(verifyError(error.code))
    })
}