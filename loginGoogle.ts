import { Auth, GoogleAuthProvider, getRedirectResult, signInWithCredential, signInWithRedirect } from "firebase/auth"
import { verifyError } from "./src/utils/errorcodes"
import { auth } from "./firebase.config"

export async function loginGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  
  
  signInWithRedirect(auth, provider.setCustomParameters({'Permissions-Policy': 'ch-ua-form-factor'}))
    .then(result => {
      // const credential = provider.credentialFromResult(result)
      // const cred = provider.PROVIDER_ID
      // console.log(cred)
      // const token = credential.accessToken
      // console.log(result + " " + credencial + " " + token)
      
      const credential = GoogleAuthProvider.credentialFromResult(result)

    })
    .catch(error => {console.log(verifyError(error.code))})
    
  // const credencial = await getRedirectResult(auth)
  //   .then(resultado => console.log(resultado.user.email))
  //   .catch(error => verifyError(error.code))
  
    
  // return credencial
}