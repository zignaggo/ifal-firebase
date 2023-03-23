import { Text } from "react-native"
import { useState } from "react"
import { Input } from "../components/Input"
import { Button, Heading, VStack } from "native-base"
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../Contexts/AuthProvider/useAuth"

interface FieldsForm {
	name: string
	email: string
	password: string
	confirmPassword: string
}

const signUpSchema = yup.object({
	name: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(6, "No mínimo 6 caracteres"),
	email: yup
		.string()
		.email("Email Inválido")
		.required("Este Campo é Obrigatório"),
	password: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(8, "No mínimo 8 caracteres"),
	confirmPassword: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(8, "No mínimo 8 caracteres")
		.oneOf([yup.ref("password"), null], "As senhas não são idênticas"),
})

export const SignUp = ({ route, navigation }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldsForm>({
		resolver: yupResolver(signUpSchema),
	})

	const { createUser } = useAuth()

	const [loading, setLoading] = useState<boolean>(false)

	function handleSignUp({ email, password, name} : FieldsForm) {
		createUser(email, password, name, () => navigation.replace("Home"), setLoading)
	}
	return (
		<VStack
			alignItems={"center"}
			p={50}
			space={5}
			justifyContent={"center"}
			h={"full"}
		>
			<VStack>
				<Heading textAlign={"center"}>Cadastre-se</Heading>
				<Heading textAlign={"center"}>Gratuitamente</Heading>
			</VStack>

			<VStack space={2} w={"full"}>
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Nome"
							onChangeText={onChange}
							errorMessage={errors.name?.message}
						/>
					)}
				/>
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
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Confirmar Senha"
							onChangeText={onChange}
							errorMessage={errors.confirmPassword?.message}
						/>
					)}
				/>
			</VStack>
			<Button
				rounded={"full"}
				w={"full"}
				bg={"#f27"}
				_hover={{ bg: "#9b4666" }}
				_pressed={{ bg: "#9b4666" }}
				onPress={handleSubmit(handleSignUp)}
				isLoading={loading}
			>
				Criar Conta
			</Button>
			<Text
				onPress={() => navigation.replace("Sign")}
				style={{ color: "#0007" }}
			>
				ou entre na sua Conta!
			</Text>
		</VStack>
	)
}
