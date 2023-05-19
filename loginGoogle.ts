import { Auth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth"
import { verifyError } from "./src/utils/errorcodes"
import { auth } from "./firebase.config"

export async function loginGoogle(auth: Auth) {
  signInWithRedirect(auth, new GoogleAuthProvider())
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const cred = GoogleAuthProvider.PROVIDER_ID
      console.log(cred)
      const token = credential.accessToken
      console.log(result + " " + credencial + " " + token)
      

    
    })
    .catch(error => {console.log(verifyError(error.code))})
    
  const credencial = await getRedirectResult(auth)
    .then(resultado => console.log(resultado.user.email))
    .catch(error => verifyError(error.code))
  
    
  return credencial
}