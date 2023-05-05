import {
	VStack,
	Text,
	Avatar,
	HStack,
	Center,
	Heading,
	Button,
	Flex,
	Box,
} from "native-base"
import { useEffect } from "react"
import { Alert, Image } from "react-native"
import { MenuImage } from "../components/MenuImage"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons"

export const Home = ({ route, navigation }) => {
	const { user, loadData, logout, verifyEmail } = useAuth()

	useEffect(() => {
		loadData()
	}, [])

	return (
		<VStack
			w={"full"}
			h={"full"}
			bgColor={"#1e1e1e"}
			justifyContent={"space-between"}
			p={4}
			safeArea
		>
			<VStack space={4}>
				<HStack justifyContent={"space-between"} alignItems={"center"}>
					<Center>
						<VStack space={4} alignItems="center">
							<MaterialIcons
								name="exit-to-app"
								size={24}
								color="#d27"
								onPress={() => logout()}
							/>
						</VStack>
					</Center>
				</HStack>
				<VStack
					justifyContent={"space-between"}
					alignItems={"center"}
					space={4}
				>
					<VStack
						justifyContent={"center"}
						alignItems={"center"}
						w={"full"}
						space={"12px"}
					>
						<Heading fontSize={24} color={"#e6e6e6"}>
							Meu Perfil
						</Heading>
						<Flex position={"relative"}>
							<Avatar
								bg="#d27"
								source={{
									uri: user.image,
								}}
								w={"100px"}
								h={"100px"}
							/>
							<Box
								position={"absolute"}
								bottom={"-5px"}
								right={"5px"}
							>
								<MenuImage />
							</Box>
						</Flex>
					</VStack>

					<Heading fontSize={20} color={"#E7E7E7"}>
						Discente
					</Heading>
					<VStack bgColor={"#E7E7E7"} w={"90%"}>
						<Heading>Dados pessoais:</Heading>
						<Text>Nome: {user.name}</Text>
						<Text>Matrícula: {}</Text>
						<HStack>
							<Text>Email: </Text>
							<Text color={user.verified ? "#535861" : "#e9a94b"}>
								{user.email}
							</Text>
							{user.verified ? (
								<MaterialIcons
									name="verified"
									size={18}
									color="green"
								/>
							) : (
								<Ionicons
									name="alert-circle"
									size={24}
									color="#e9a94b"
								/>
							)}
						</HStack>
						{user.verified ? (
							""
						) : (
							<Button
								disabled={user.verified}
								w={"full"}
								borderRadius={10}
								bg={"#75D284"}
								onPress={() => verifyEmail()}
							>
								{user.verified ? "Verificado" : "Verificar"}
							</Button>
						)}
						<Heading color={"#202225"}>Dados acadêmicos:</Heading>
						<Text color={"#202225"}>
							Curso: Sistemas de informação
						</Text>
						<Text color={"#202225"}>Turno: Noturno</Text>
						<Text color={"#202225"}>Período: 1º</Text>
						<Text color={"#202225"}>Carga horária: 2683h</Text>
						<Text color={"#202225"}>Nível: Bacharelado</Text>
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	)
}
