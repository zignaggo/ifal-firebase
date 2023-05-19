import { useState } from "react"
import { Input } from "../components/Input"
import { Button, Heading, VStack, Text } from "native-base"
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { ModelLogin } from "../components/ModelLogin"
import { TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons'

interface FieldsForm {
	name: string
	cpf: string
	email: string
	password: string
	confirmPassword: string
}

const signUpSchema = yup.object({
	name: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(6, "No mínimo 6 caracteres"),
	cpf: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(11, "No mínimo 11 caracteres")
		.matches(
			/ ([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
			"CPF inválido"
		),
	email: yup
		.string()
		.email("Email Inválido")
		.required("Este Campo é Obrigatório")
		.max(256, "Máximo de caracteres alcançado")
		.matches(
			/^([a-zA-Z0-9])+@(aluno.)?ifal.edu.br$/,
			"Email não contém @ifal.edu.br"
		),
	password: yup
		.string()
		.required("Este Campo é Obrigatório")
		.min(8, "No mínimo 8 caracteres")
		.max(32, "Tamanho máximo de senha alcançado"),
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

	function handleSignUp({ email, password, name, cpf }: FieldsForm) {
		createUser(email, password, name, cpf, () => { }, setLoading)
	}

	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<ModelLogin>
			<VStack space={5} w={"full"} justifyContent={"center"} h={"full"}>
				<VStack>
					<Heading textAlign={"center"}>Cadastrar</Heading>
					<Text textAlign={"center"}>Conta</Text>
				</VStack>

				<VStack space={2} w={"full"}>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Ex: Glevson Pinto"
								title="Nome"
								onChangeText={onChange}
								errorMessage={errors.name?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="cpf"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="111.111.111-11"
								title="CPF"
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
								placeholder="Ex: glevson@ifal.aluno.edu.br"
								title="Email"
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
								type={show ? "text" : "password"}
								InputRightElement={
									<TouchableOpacity onPress={handleClick} style={{height: "100%", display: "flex", justifyContent: "center", width: "10%", alignItems:"flex-end", paddingRight: 20}}> 
											
									{show ? <AntDesign name="eyeo" size={24} color="#535861" /> : <AntDesign name="eye" size={24} color="#535861" />}
									</TouchableOpacity>
								}

								placeholder="Senha"
								title="Senha"
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
								type={show ? "text" : "password"}
								InputRightElement={
									<TouchableOpacity onPress={handleClick} style={{height: "100%", display: "flex", justifyContent: "center", width: "10%", alignItems:"flex-end", paddingRight: 20}}> 
									{show ? <AntDesign name="eyeo" size={24} color="#535861" /> : <AntDesign name="eye" size={24} color="#535861" />}
									</TouchableOpacity>
								}
								placeholder="Confirmar Senha"
								title="Confirmar Senha"
								onChangeText={onChange}
								errorMessage={errors.confirmPassword?.message}
							/>
						)}
					/>
				</VStack>
				<Text
					onPress={() => navigation.replace("Sign")}
					color={"green.default"}
					w={"fit-content"}
					underline
				>
					ou entre na sua Conta!
				</Text>
				<Button
					rounded={"md"}
					w={"full"}
					bg={"green.default"}
					_hover={{ bg: "#41804C" }}
					_pressed={{ bg: "#41804C" }}
					onPress={handleSubmit(handleSignUp)}
					isLoading={loading}
				>
					Criar Conta
				</Button>
			</VStack>
		</ModelLogin>
	)
}
