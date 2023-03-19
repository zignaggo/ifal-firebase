import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword, sendPasswordResetEmail } from "firebase/auth"
import { verifyError, errors } from "./errorcodes"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

//Criar usuário (Limitar os caracteres do email a 256 e senha a 32)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => console.log(`user: ${userCredential}`))
  .catch(erro => console.log(verifyError(erro)))
}

//Login do usuário
const loginUser = (email, password) => {
  signInWithEmailAndPassword(email, password)
  .then(situation => console.log(`User ${situation.user} logged in`))
  .catch(erro => console.log(verifyError(erro)))
}

//Logout
const signOut = () => {
  signOut()
}

//Recuperar/alterar senha
const recoverPassword = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => console.log('Email sent'))
  .catch(erro => console.log(verifyError(erro)))
}

//Verificar email (Não entendi o que o Flávio quis dizer)


//Atualizar foto do perfil do usuário
const updateUserImage = () => {

}


//Na tela de perfil, aparecer se o email está verificado ou não
const [user, setUser] = useState(auth.currentUser)

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, userStatus => {
    setUser(userStatus)
  })

  return unsubscribe
}, [])