import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"
import { Button, HStack, Heading, Image, Text, VStack } from "native-base"
import { FontAwesome5 } from "@expo/vector-icons"
import { useAuth } from "../Contexts/AuthProvider/useAuth"

export const CustomDrawer = (props: DrawerContentComponentProps) => {
	const { logout } = useAuth()
	return (
		<VStack
			h={"full"}
			w={"full"}
			position={"relative"}
			p={"25px"}
			space={"20px"}
		>
			<HStack alignItems={"center"} space={3}>
				<Image
					alt={"LogoIfal"}
					source={require("../../assets/LogoIfal.svg")}
					h={"42px"}
					w={"29px"}
				/>
				<Heading fontSize={"22px"} color={"gray.500"}>
					Sigaa²
				</Heading>
			</HStack>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<Button
				h={"40px"}
				borderRadius={"8px"}
				bg={"red.default"}
				onPress={() => {
					props.navigation.closeDrawer()
					logout()
				}}
			>
				<HStack space={3}>
					<Text color={"gray.50"} fontSize={"16px"}>
						Sair
					</Text>
					<FontAwesome5 name="door-open" size={20} color="#E7E7E7" />
				</HStack>
			</Button>
		</VStack>
	)
}
