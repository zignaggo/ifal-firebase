import { useState } from "react"
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
}

const singSchema = yup.object({
	email: yup
		.string()
		.email("Email Inválido")
		.required("Este Campo é Obrigatório"),

})

export const RecoverPassword = ({ route, navigation }) => {

	const [loading, setLoading] = useState<boolean>(false)
 
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldsForm>({
		resolver: yupResolver(singSchema),
	})

	const { recoverPassword } = useAuth()

	function handleSign({ email }: FieldsForm) {
		recoverPassword(email, () => navigation.replace("Sign"), setLoading)
	}

	return (
		<VStack alignItems={"center"} p={50} space={5} justifyContent={"center"} h={"full"}>
			<VStack>
			<Heading  textAlign={"center"}>Recuperação de</Heading>
			<Heading  textAlign={"center"}>Senha</Heading>
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
			<Text  w={"full"} color={"#d27"} >Será enviado um email para recuperação de sua senha.</Text>
			</VStack>
			<Button isLoading={loading} onPress={handleSubmit(handleSign)} rounded={"full"} w={"full"} bg={"#f27"} _hover={{bg: "#9b4666"}}  _pressed={{bg: "#9b4666"}}>Enviar email</Button>
			<Text
				onPress={() => navigation.replace("Sign")}
				style={{ color: "#0007" }}
			>
				Voltar para o login
			</Text>
		</VStack>
	)
}
