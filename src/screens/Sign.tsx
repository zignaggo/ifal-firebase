import { useState } from "react"
import { Image } from "react-native"
import { Auth } from "../../App"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { Button, Heading, VStack, Text } from "native-base"
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
		login(email, password, () => { }, setLoading)
	}

	return (
		<VStack bgColor={"#1e1e1e"} p={5} space={5} h={"full"} safeArea>
			<Image
				source={require('../../assets/logo_IF.png')}
				style={{ width: 63, height: 88 }}
			/>
			<VStack>
				<Heading color={"#fff"} fontSize={50} textAlign={"center"}>Sigaa²</Heading>
			</VStack>
			<VStack bgColor={"#e7e7e7"} space={2} w={"full"}>
				<Heading color={"#232529"} fontSize={26} fontWeight={'bold'} textAlign={"center"}>Conecte-se</Heading>
				<Heading color={"#232529"} fontSize={24} textAlign={"center"}>à sua conta</Heading>
				<Text>Email</Text>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Ex: glevson@ifal.aluno.edu.br"
							onChangeText={onChange}
							errorMessage={errors.email?.message}
						/>
					)}
				/>
				<Text>Senha</Text>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Digite sua senha"
							onChangeText={onChange}
							errorMessage={errors.password?.message}
						/>
					)}
				/>

				<Text onPress={() => navigation.replace("RecoverPassword")} w={"full"} color={"#51BF64"}>Esqueci minha senha</Text>
				<Button isLoading={loading} onPress={handleSubmit(handleSign)} rounded={"full"} marginX={5} bg={"#51BF64"} _hover={{ bg: "#9b4666" }} _pressed={{ bg: "#9b4666" }}>Entrar</Button>
				<Text onPress={() => navigation.replace("SignUp")} style={{ color: "#51BF64", textAlign: "center" }}>Ou registre-se aqui</Text>
			</VStack>
		</VStack>
	)
}