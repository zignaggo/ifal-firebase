import { View, Text } from "react-native"
import { useAuth } from "../Contexts/AuthProvider/useAuth"

export const Home = ({ route, navigation }) => {
	const { user, loadData } = useAuth()
	loadData()
	return (
		<View>
			<Text>Home</Text>
			<Text>{user.name}</Text>
			<Text>{user.email}</Text>
			<Text>{user.id}</Text>
		</View>
	)
}
