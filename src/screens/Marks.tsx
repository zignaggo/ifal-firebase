import { VStack, Text, HStack, Heading, Image } from "native-base"
import { FontAwesome } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

export const Marks = ({ route, navigation }) => {
	const { name } = route.params

	return (
		<VStack
			safeArea
			w={"full"}
			minH={"full"}
			bgColor={"gray.900"}
			p={7}
			position={"relative"}
		>
			<VStack paddingBottom={15}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Subjects")}
				>
					<FontAwesome
						name="long-arrow-left"
						size={24}
						color="white"
					/>
				</TouchableOpacity>
			</VStack>

			<Heading
				paddingBottom={10}
				textAlign={"center"}
				fontSize={22}
				color={"gray.50"}
			>
				{name}
			</Heading>

			<VStack
				bg={"gray.500"}
				alignItems={"center"}
				marginBottom={7}
				borderRadius={8}
			>
				<Heading paddingY={3} fontSize={18} color={"gray.50"}>
					Docente
				</Heading>
				<Text paddingBottom={3} fontSize={14} color={"gray.100"}>
					Nome prof
				</Text>
			</VStack>

			<VStack flexGrow={1} justifyContent={"space-between"}>
				<VStack>
					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Nota 1</Heading>
						<Text fontSize={14}>3,5</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Nota 2</Heading>
						<Text fontSize={14}>3,5</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Reposição</Heading>
						<Text fontSize={14}>3,5</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Final</Heading>
						<Text fontSize={14}>3,5</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.600"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading color={"gray.50"} fontSize={18}>
							Média
						</Heading>
						<HStack justifyContent={"space-between"}>
							<Text fontSize={14}>3,5</Text>
							<Text fontSize={14} color={"gray.400"}>
								Mínimo: 7,00
							</Text>
						</HStack>
					</VStack>
				</VStack>

				<VStack
					alignItems={"center"}
					justifyContent={"center"}
					borderRadius={8}
					bgColor={"green.default"}
					height={"68px"}
				>
					<Text bold fontSize={18}>
						Situação
					</Text>
					<Text>APROVADO</Text>
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
				source={require("../../assets/Squares.svg")}
			/>
		</VStack>
	)
}
