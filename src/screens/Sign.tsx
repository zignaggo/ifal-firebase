import { useState } from "react"
import { Auth } from "../../App"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { Button, Heading, VStack, Text, HStack, Image } from "native-base"
import { Input } from "../components/Input"
import { Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { verifyError } from "../utils/errorcodes"
import { ModelLogin } from "../components/ModelLogin"

interface FieldsForm {
	email: string
	password: string
	terms?: boolean
}

const singSchema = yup.object({
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
		<ModelLogin>
			<VStack space={3} w={"full"}>
				<VStack space={-2}>
					<Heading
						color={"gray.800"}
						fontSize={26}
						fontWeight={"bold"}
						textAlign={"center"}
						lineHeight={"22px"}
					>
						Conecte-se
					</Heading>
					<Text
						color={"gray.800"}
						fontSize={24}
						textAlign={"center"}
						lineHeight={"20px"}
					>
						à sua conta
					</Text>
				</VStack>
				<VStack space={3}>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Ex: glevson@ifal.aluno.edu.br"
								onChangeText={onChange}
								errorMessage={errors.email?.message}
								title="Email"
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Digite sua senha"
								onChangeText={onChange}
								errorMessage={errors.password?.message}
								title="Senha"
							/>
						)}
					/>
				</VStack>

				<HStack justifyContent={"space-between"} w={"full"}>
					<Text
						onPress={() => navigation.replace("RecoverPassword")}
						color={"gray.400"}
						underline
					>
						Esqueceu a senha?
					</Text>
					<Text
						onPress={() => navigation.replace("SignUp")}
						color={"green.default"}
						underline
					>
						Criar Conta
					</Text>
				</HStack>
				<Button
					isLoading={loading}
					onPress={handleSubmit(handleSign)}
					rounded={"md"}
					bg={"green.default"}
					_hover={{ bg: "#41804C" }}
					_pressed={{ bg: "#41804C" }}
				>
					Entrar
				</Button>
				<Text color={"gray.400"} w={"full"} textAlign={"center"}>
					Ou entre com
				</Text>
				<Button
					isLoading={false}
					onPress={handleSubmit(handleSign)}
					rounded={"full"}
					bg={"gray.100"}
					_hover={{ bg: "gray.400" }}
					_pressed={{ bg: "gray.400" }}
				>
					<HStack w={"full"} space={2} alignItems={"flex-start"}>
						<Image
							source={require("../../assets/Google.png")}
							h={"25px"}
							w={"25px"}
						/>
						<Text color={"gray.500"}>Entrar com Google</Text>
					</HStack>
				</Button>
			</VStack>
		</ModelLogin>
	)
}
