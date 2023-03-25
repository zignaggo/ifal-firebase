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
import { Alert } from "react-native"
import { MenuImage } from "../components/MenuImage"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import {
	FontAwesome,
	MaterialIcons,
	Ionicons,
	Feather,
} from "@expo/vector-icons"
import { Input } from "../components/Input"

export const Home = ({ route, navigation }) => {
	const { user, loadData, logout, verifyEmail } = useAuth()

	useEffect(() => {
		loadData()
	}, [])

	return (
		<VStack w={"full"} h={"full"} justifyContent={"space-between"} p={4}>
			<VStack space={4}>
				<HStack justifyContent={"space-between"} alignItems={"center"}>
					<Heading>Fire</Heading>
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
						<Heading fontSize={24} color={"#222222"}>
							Meu Perfil
						</Heading>
						<Flex position={"relative"}>
							<Avatar
								bg="#d27"
								source={{
									uri: "https://s2.glbimg.com/PMyXprKXC0gsusYiEVLx1GsPDN4=/0x0:1170x1162/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/A/b/xneLsORwWB3GHHnrcg7g/whatsapp-image-2023-03-08-at-09.41.08.jpeg",
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

						<Heading fontSize={20} color={"#222222"}>
							{user.name ? user.name.split(" ")[0] : user.name}
						</Heading>
					</VStack>

					<Input
						isInvalid={false}
						isReadOnly
						placeholder="Digite seu nome"
						defaultValue={user.name}
					/>
					<Input
						isInvalid={false}
						isReadOnly
						placeholder="Digite seu email"
						defaultValue={user.email}
					/>

					<Heading fontSize={24} color={"#222222"}>
						Verificação do email
					</Heading>
					<HStack w="full" justifyContent={"space-between"} >
						<Text fontWeight={"medium"}>Status:</Text>
						{user.verified ? (
							<HStack space={2} alignItems={"center"}>
								<Text fontWeight={"medium"} fontSize={16} color={"#75D284"}>Verificado</Text>
								<Ionicons name="checkbox" size={24} color="#75D284" />
							</HStack>
						) : (
							<HStack space={2} alignItems={"center"}>
								<Text  fontWeight={"medium"} fontSize={16} color={"#FF5858"}>
									Não verificado
								</Text>
								<Feather
									name="x-square"
									size={18}
									color="#FF5858"
								/>
							</HStack>
						)}
					</HStack>
					<Text fontSize={14} color={"#d27"}>Enviaremos um email para verificação de integridade</Text>
					
					<Button disabled={user.verified} h={"40px"} w={"full"} borderRadius={10} bg={!user.verified ? "#75D284" : "#4B8F51"} onPress={() => verifyEmail()}>{user.verified ? "Verificado" : "Verificar"}</Button>
					
					
				</VStack>
			</VStack>
			<HStack></HStack>
		</VStack>
	)
}
