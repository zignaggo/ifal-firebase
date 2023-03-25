import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import {
	Actionsheet,
	Box,
	Button,
	Center,
	useDisclose,
	Text,
	Flex,
	HStack,
} from "native-base"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
export function MenuImage() {
	const { isOpen, onOpen, onClose, } = useDisclose()
	const { imagePickerCall } = useAuth()
	return (
		<Center>
			<Button onPress={onOpen} borderRadius={"50%"} p={2} bg={"#d27"} _hover={{background: "#d27"}}>
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
							Select a option
						</Text>
					</Box>
					<Actionsheet.Item w={"full"}>
						<HStack
							flexDir={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							space={4}
						>
							<FontAwesome
								name="camera"
								size={18}
								color="gray.800"
							/>
							<Text fontWeight={"600"} color={"gray.800"}>
								Take a picture
							</Text>
						</HStack>
					</Actionsheet.Item>

					<Actionsheet.Item w={"full"} onPress={() => imagePickerCall()}>
						<HStack
							flexDir={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							space={4}
						>
							<FontAwesome
								name="photo"
								size={18}
								color={"gray.800"}
							/>
							<Text fontWeight={"bold"} color={"gray.800"}>
								Gallery
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
                Delete
              </Text>
						</HStack>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</Center>
	)
}