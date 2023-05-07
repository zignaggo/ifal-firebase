import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer"
import { Button, Flex } from "native-base"
import { SimpleLineIcons } from "@expo/vector-icons"
export function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<Flex h={"full"} w={"full"} position={"relative"}>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<Button
				position={"absolute"}
				top={"50px"}
				right={"-30px"}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				w={"30px"}
				h={"70px"}
				borderTopRightRadius={"15px"}
				borderBottomRightRadius={"15px"}
				bg={"#202225"}
				onPress={() => {
					console.log("a")
					props.navigation.closeDrawer()
				}}
			>
				<SimpleLineIcons name="arrow-left" size={16} color="#E7E7E7" />
			</Button>
		</Flex>
	)
}
