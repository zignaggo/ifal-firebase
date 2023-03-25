import { useState } from "react"
import { Auth } from "../../App"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { Button, Heading, VStack, Text, Link } from "native-base"
import { Input } from "../components/Input"
import { Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { verifyError } from "../utils/errorcodes"

interface FieldsForm {
	email: string
	password: string,
	terms?: boolean
}

const singSchema = yup.object({
	email: yup
		.string()
		.email("Email Inválido")
		.required("Este Campo é Obrigatório"),
	password: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(8, "No mínimo 8 caracteres"),

})
export const Sign = ({ route, navigation }) => {

	const [loading, setLoading] = useState<boolean>(false)
 
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldsForm>({
		resolver: yupResolver(singSchema),
	})

	const { login } = useAuth()

	function handleSign({ email, password }: FieldsForm) {
		login(email, password, () => {}, setLoading)
	}
	return (
		<VStack alignItems={"center"} p={50} space={5} justifyContent={"center"} h={"full"}>
			<VStack>
			<Heading  textAlign={"center"}>Conecte-se</Heading>
			<Heading  textAlign={"center"}>em sua conta</Heading>
			</VStack>
			<VStack space={2} w={"full"}>
			<Controller
					control={control}
					name="email"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Email"
							onChangeText={onChange}
							errorMessage={errors.email?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Senha"
							onChangeText={onChange}
							errorMessage={errors.password?.message}
						/>
					)}
				/>
			
			<Text onPress={() => navigation.replace("RecoverPassword")} w={"full"} color={"#d27"}>Esqueceu a senha?</Text>
			</VStack>
			<Button isLoading={loading} onPress={handleSubmit(handleSign)} rounded={"full"} w={"full"} bg={"#f27"} _hover={{bg: "#9b4666"}}  _pressed={{bg: "#9b4666"}}>Entrar</Button>
			<Text
				onPress={() => navigation.replace("SignUp")}
				style={{ color: "#0007" }}
			>
				ou Cadastre-se gratuitamente!
			</Text>
		</VStack>
	)
}