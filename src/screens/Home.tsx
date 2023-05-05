import {
	VStack,
	Text,
	Avatar,
	HStack,
	Heading,
	Button,
	Flex,
	Box,
	Image,
} from "native-base"
import { useEffect } from "react"
import { MenuImage } from "../components/MenuImage"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { MaterialIcons, Ionicons } from "@expo/vector-icons"

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
			position={"relative"}
		>
			<VStack>
				<HStack
					justifyContent={"space-between"}
					alignItems={"center"}
					paddingBottom={10}
				>
					<MaterialIcons
						name="exit-to-app"
						size={24}
						color="#d27"
						onPress={() => logout()}
					/>
				</HStack>
				<VStack
					space={0}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<VStack
						justifyContent={"center"}
						alignItems={"center"}
						w={"full"}
						marginBottom={10}
						paddingBottom={3}
					>
						<Heading fontSize={22} color={"#e6e6e6"}>
							Meu Perfil
						</Heading>
					</VStack>

					<VStack
						borderTopRadius={15}
						bgColor={"#353940"}
						width={"90%"}
						height={135}
						alignItems={"center"}
					>
						<Flex position={"relative"}>
							<Avatar
								bg="#d27"
								source={{
									uri: user.image,
								}}
								w={"100px"}
								h={"100px"}
								top={"-30%"}
							/>
							<Box
								position={"absolute"}
								bottom={"-5px"}
								left={"55%"}
								top={"50%"}
							>
								<MenuImage />
							</Box>
						</Flex>
						<Heading fontSize={22} color={"#E7E7E7"}>
							Discente
						</Heading>
					</VStack>
					<VStack
						w={"90%"}
						borderBottomRadius={15}
						bgColor={"#E7E7E7"}
						paddingTop={3}
					>
						<VStack paddingLeft={"4%"} paddingBottom={3}>
							<Heading fontSize={16}>Dados pessoais:</Heading>
							<HStack>
								<VStack paddingRight={4}>
									<Text fontSize={12}>Nome:</Text>
									<Text fontSize={12}>Matrícula:</Text>
									<VStack marginTop={1} height={6}>
										<Text fontSize={12}>Email:</Text>
									</VStack>
								</VStack>
								<VStack>
									<Text fontSize={12}>{user.name}</Text>
									<Text fontSize={12}>teste{}</Text>
									<HStack height={5} alignItems={"center"}>
										<HStack
											marginTop={2}
											alignItems={"center"}
										>
											<Text
												color={
													user.verified
														? "#535861"
														: "#e9a94b"
												}
												fontSize={12}
											>
												{user.email}{" "}
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
									</HStack>
								</VStack>
							</HStack>
						</VStack>
						{user.verified ? (
							""
						) : (
							<VStack alignItems={"center"} paddingBottom={5}>
								<VStack w={"90%"}>
									<Button
										disabled={user.verified}
										w={"full"}
										borderRadius={10}
										bg={"#75D284"}
										onPress={() => verifyEmail()}
									>
										{user.verified
											? "Verificado"
											: "Verificar"}
									</Button>
								</VStack>
							</VStack>
						)}
						<VStack
							paddingLeft={"4%"}
							paddingY={3}
							borderTopWidth={2}
							borderTopColor={"#BABEC5"}
						>
							<Heading fontSize={16} color={"#202225"}>
								Dados acadêmicos:
							</Heading>
							<HStack>
								<VStack paddingRight={2}>
									<Text fontSize={12} color={"#202225"}>
										Curso:
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Turno:
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Período:
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Carga horária:
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Nível:
									</Text>
								</VStack>
								<VStack>
									<Text fontSize={12} color={"#202225"}>
										Sistemas de informação
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Noturno
									</Text>
									<Text fontSize={12} color={"#202225"}>
										1º
									</Text>
									<Text fontSize={12} color={"#202225"}>
										2683h
									</Text>
									<Text fontSize={12} color={"#202225"}>
										Bacharelado
									</Text>
								</VStack>
							</HStack>
						</VStack>
					</VStack>
				</VStack>
			</VStack>
			<Image
				position={"absolute"}
				zIndex={-1}
				width={"full"}
				height={"400px"}
				bottom={0}
				left={0}
				source={require("../../assets/Squares.svg")}
			/>
		</VStack>
	)
}