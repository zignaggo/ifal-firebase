import { Stack, Typography } from "@mui/material"
import { Input, InputLabel, InputPassword } from "../../components/Input"
import { Button } from "../../components/Button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../../auth/useAuth"

const signFormSchema = z.object({
	email: z
		.string()
		.nonempty("Campo obrigatório *")
		.max(256, "Máximo de caracteres atingido")
		.min(8, "Mínimo de 8 caracteres")
		.regex(
			new RegExp(/^([a-zA-Z0-9])+@(aluno.)?ifal.edu.br$/),
			"Email não contém @ifal.edu.br"
		),
	password: z
		.string()
		.nonempty("Campo obrigatório *")
		.min(8, "Mínimo de 8 caracteres"),
})

type SignFormData = z.infer<typeof signFormSchema>

export const SignForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignFormData>({
		resolver: zodResolver(signFormSchema),
	})
	const { login } = useAuth()
	const doLogin = (data: SignFormData) => {
		login(data.email, data.password).then((a) => console.log(a))
	}
	return (
		<Stack
			component={"form"}
			onSubmit={handleSubmit(doLogin)}
			direction={"column"}
			px={{
				start: "25px",
				sm: "35px",
			}}
			py={{
				start: "30px",
				sm: "40px",
			}}
			bgcolor={"grey.50"}
			spacing={2}
			marginBottom={"auto"}
			marginTop={"auto"}
			color={"grey.600"}
			borderRadius={3}
			width={{
				start: "330px",
				sm: "500px",
			}}
			minHeight={{
				start: "330px",
				sm: "380px",
			}}
			zIndex={1}
			justifyContent={"space-between"}
		>
			<Stack spacing={1}>
				<Typography
					fontSize={{
						start: 24,
						sm: 32,
					}}
					lineHeight={{
						start: "24px",
						sm: "32px",
					}}
					fontWeight={"bold"}
				>
					Entre na sua Conta
				</Typography>
				<Typography
					fontSize={{
						start: 20,
						sm: 24,
					}}
					lineHeight={{
						start: "20px",
						sm: "24px",
					}}
				>
					de Administrador
				</Typography>
			</Stack>
			<Stack spacing={1}>
				<InputLabel
					placeholder="Ex: teste@teste.com"
					label="Email"
					{...register("email")}
					invalidMessage={errors?.email?.message}
				/>

				<InputPassword
					placeholder="Digite sua senha"
					label="Senha"
					{...register("password")}
					invalidMessage={errors?.password?.message}
				/>
			</Stack>
			<Button variant="contained" type="submit">
				Entrar
			</Button>
		</Stack>
	)
}
