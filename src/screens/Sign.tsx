import { Text, View, StyleSheet } from "react-native"
import { ButtonLoader } from "../components/Button"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Input } from "../components/Input"
import { Auth } from "../../App"
import { useRef } from "react"
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types"

export const Sign = ({ route, navigation }) => {
	const email = useRef()
	const password = useRef()
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Conecte-se em sua conta</Text>
			<Input placeholder="Email/Usuário" ></Input>
			<Input placeholder="Senha" password ></Input>
			<ButtonLoader
				title={"Entrar"}
				loading={false}
				onPress={() => console.log("cadastrou")}
				style={styles.button}
				color={"#fff"}
			/>
			<Text
				onPress={() => navigation.replace("SignUp")}
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
