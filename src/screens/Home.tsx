import { MaterialIcons } from "@expo/vector-icons"
import { VStack, Text, Avatar, HStack, Center, IconButton, Heading, Button } from "native-base"
import { useAuth } from "../Contexts/AuthProvider/useAuth"

export const Home = ({ route, navigation }) => {
	const { user, loadData, logout } = useAuth()
	loadData()
	return (
		<VStack w={"full"}>
			<HStack justifyContent={"space-between"} alignItems={"center"} p={4}>
				<Avatar
					bg="#d27"
					source={{
						uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
					}}
				/>
				<Heading>{user.email}</Heading>
				<Center>
					<VStack space={4} alignItems="center">
						<IconButton
							size={"sm"}
							bg={"#d27"}
							variant="solid"
							_icon={{
								as: MaterialIcons,
								name: "menu",
							}}
						/>
					</VStack>
				</Center>
			</HStack>
			<Heading>{user.name}</Heading>
			<Button onPress={() => logout(() => navigation.replace("Sign"))}>Sair</Button>
		</VStack>
	)
}
