import { Text, View, StyleSheet, Alert } from "react-native"
import { ButtonLoader } from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Input } from "../components/Input"
import { useRef, useState } from "react"
import { Auth } from "../../App"

export const SignUp = () => {
	const navigation = useNavigation()
	const email = useRef("")
	const password = useRef("")
	const confirmPassword = useRef("")
	const [loading, setLoading] = useState(false)

	const registerUser = async (auth, email, senha) => {
		try {
			setLoading(true)
			await createUserWithEmailAndPassword(auth, email, senha)
		} catch (error) {
			console.log(error)
			Alert.alert(error)
		} finally {
			setLoading(false)
			navigation.replace("home")
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Crie uma conta Gratuitamente</Text>
			<Input placeholder="Email/Usuário" ref={email}></Input>
			<Input placeholder="Senha" password ref={password}></Input>
			<Input
				placeholder="Confirmar Senha"
				password
				ref={confirmPassword}
			></Input>
			<ButtonLoader
				title={"Cadastrar"}
				loading={loading}
				onPress={() => registerUser(Auth)}
				style={styles.button}
				color={"#fff"}
			/>
			<Text
				onPress={() => navigation.replace("sign")}
				style={{ color: "#0007" }}
			>
				ou Cadastre-se gratuitamente!
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 40,
		gap: 10,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 50,
		backgroundColor: "#f27",
		borderRadius: 50,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#0002",
		paddingLeft: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		width: "70%",
	},
})
