import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import {
	Actionsheet,
	Box,
	Button,
	Center,
	useDisclose,
	Text,
	HStack,
	Icon,
} from "native-base"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
export const MenuImage = () => {
	const { isOpen, onOpen, onClose } = useDisclose()
	const { imagePickerCall } = useAuth()
	return (
		<Center>
			<Button onPress={onOpen} borderRadius={9999} p={2} bg={"#75D284"}>
				<FontAwesome name="camera" size={14} color="#fff" />
			</Button>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Box w="100%" h={60} px={4} justifyContent="center">
						<Text
							fontSize="16"
							color="gray.500"
							_dark={{
								color: "gray.300",
							}}
						>
							Selecione uma opção
						</Text>
					</Box>
					<Actionsheet.Item w={"full"}>
						<HStack
							flexDir={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							space={4}
						>
							<Icon
								as={FontAwesome}
								name="camera"
								size={18}
								color="gray.800"
							/>

							<Text fontWeight={"600"} color={"gray.800"}>
								Tire uma Foto
							</Text>
						</HStack>
					</Actionsheet.Item>

					<Actionsheet.Item
						w={"full"}
						onPress={() => imagePickerCall()}
					>
						<HStack
							flexDir={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							space={4}
						>
							<Icon
								as={FontAwesome}
								name="photo"
								size={18}
								color="gray.800"
							/>
							<Text fontWeight={"bold"} color={"gray.800"}>
								Galeria
							</Text>
						</HStack>
					</Actionsheet.Item>

					<Actionsheet.Item w={"full"}>
						<HStack
							flexDir={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							space={4}
						>
							<FontAwesome5
								name="trash"
								size={18}
								color={"rgb(249, 113, 113)"}
							/>
							<Text fontWeight={"bold"} color={"red.400"}>
								Apagar
							</Text>
						</HStack>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</Center>
	)
}
