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
import { useEffect, useState } from "react"
import { MenuImage } from "../components/MenuImage"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import Squares from "../../assets/Squares.svg"
import LogoIfal from "../../assets/LogoIfal.svg"
import { getDataFirebase } from "../utils/utilitys"
import { getFirestore, Firestore, doc, getDoc, collection, query, getDocs, where } from "firebase/firestore"
import { getAuth } from "firebase/auth"

export const Home = ({ route, navigation }) => {
	const { user, loadData, logout, verifyEmail } = useAuth()
	
	useEffect(() => {
		loadData()
	}, [])

	return (
		<VStack
			safeArea
			w={"full"}
			h={"full"}
			bgColor={"gray.900"}
			p={4}
			position={"relative"}
		>
			<HStack>
				<Ionicons
					name="md-reorder-two-sharp"
					size={34}
					color="#E7E7E7"
					onPress={() => navigation.openDrawer()}
				/>
			</HStack>
			<VStack px={8}>
				<Heading
					paddingBottom={16}
					textAlign={"center"}
					fontSize={22}
					color={"gray.50"}
				>
					Meu Perfil
				</Heading>

				<VStack
					borderTopRadius={15}
					bgColor={"gray.600"}
					width={"full"}
					alignItems={"center"}
					justifyContent={"flex-end"}
					position={"relative"}
					h={"135px"}
					pb={"20px"}
				>
					<Box position={"absolute"} top={"-30px"}>
						<Flex position={"relative"}>
							<Avatar
								bg="#75D284"
								source={{
									uri: user.image,
								}}
								w={"100px"}
								h={"100px"}
							/>
							<Box
								position={"absolute"}
								bottom={"-5px"}
								left={"55%"}
								top={"75%"}
							>
								<MenuImage />
							</Box>
						</Flex>
					</Box>
					<Heading fontSize={22} color={"gray.50"}>
						Discente
					</Heading>
				</VStack>
				<VStack borderBottomRadius={8} bgColor={"gray.50"}>
					<VStack p={"15px"} space={"6px"}>
						<Heading
							fontSize={16}
							fontWeight={"bold"}
							color={"gray.900"}
						>
							Dados pessoais:
						</Heading>
						<HStack space={"10px"}>
							<VStack space={"4px"}>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Nome:
								</Text>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Matrícula:
								</Text>
								<VStack>
									<Text
										fontSize={12}
										fontWeight={"bold"}
										color={"gray.500"}
									>
										Email:
									</Text>
								</VStack>
							</VStack>
							<VStack space={"4px"}>
								<Text fontSize={12}>{user.name}</Text>
								<Text fontSize={12}>teste{ }</Text>
								<HStack alignItems={"center"}>
									<HStack alignItems={"center"}>
										<Text
											color={
												user.verified
													? "#535861"
													: "#e9a94b"
											}
											fontSize={12}
										>
											{user.email + " "}
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
												size={18}
												color="#e9a94b"
											/>
										)}
									</HStack>
								</HStack>
							</VStack>
						</HStack>
						{!user.verified && (
							<Button
								disabled={user.verified}
								w={"full"}
								borderRadius={"8px"}
								py={1.5}
								bg={"#75D284"}
								_hover={{ bg: "#75D284" }}
								onPress={() => verifyEmail()}
							>
								Verificar
							</Button>
						)}
					</VStack>

					<VStack
						p={"15px"}
						pb={"20px"}
						space={"6px"}
						borderTopWidth={2}
						borderTopColor={"#BABEC5"}
					>
						<Heading
							fontSize={16}
							fontWeight={"bold"}
							color={"gray.900"}
						>
							Dados acadêmicos:
						</Heading>
						<HStack space={"10px"}>
							<VStack space={"4px"}>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Curso:
								</Text>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Turno:
								</Text>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Período:
								</Text>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Carga horária:
								</Text>
								<Text
									fontSize={12}
									fontWeight={"bold"}
									color={"gray.500"}
								>
									Nível:
								</Text>
							</VStack>
							<VStack space={"4px"}>
								<Text fontSize={12} color={"gray.800"}>
									Sistemas de informação
								</Text>
								<Text fontSize={12} color={"gray.800"}>
									Noturno
								</Text>
								<Text fontSize={12} color={"gray.800"}>
									1º
								</Text>
								<Text fontSize={12} color={"gray.800"}>
									2683h
								</Text>
								<Text fontSize={12} color={"gray.800"}>
									Bacharelado
								</Text>
							</VStack>
						</HStack>
					</VStack>
				</VStack>
			</VStack>
			<Image
				position={"absolute"}
				alt={"Quadrados"}
				zIndex={-1}
				width={"full"}
				height={"400px"}
				bottom={0}
				left={0}
				source={Squares}
			/>
		</VStack>
	)
}
