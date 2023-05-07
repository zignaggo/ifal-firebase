import { HStack, Heading } from "native-base"
import { theme } from "../config/theme"
import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity } from "react-native"

export const Subject = ({ color, name, route, navigation }) => {
	return (
		<TouchableOpacity
			style={[styles.size, styles.display, { backgroundColor: color }]}
			onPress={() => navigation.navigate("Marks", { name: name })}
		>
			<Heading fontSize={14} color={theme.colors.gray[50]}>
				{name}
			</Heading>

			<HStack justifyContent={"flex-end"}>
				<MaterialIcons name="menu-book" size={28} color="white" />
			</HStack>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	size: {
		height: 130,
		width: 130,
		padding: 7,
		borderRadius: 8,
		margin: 15,
	},

	display: {
		display: "flex",
		justifyContent: "space-between",
	},
})
