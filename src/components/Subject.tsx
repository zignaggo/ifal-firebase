import { HStack, Heading, VStack } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

export const Subject = ({ color, name, route, navigation }) => {
	return (
		<VStack 
			w={"130px"} 
			h={"130px"} 
			p={2} 
			margin={15} 
			borderRadius={8} 
			backgroundColor={color}
			>
			<TouchableOpacity
				style={{ height: "100%", justifyContent: "space-between" }}
				onPress={() => navigation.navigate("Marks", { name: name })}
			>
				<Heading fontSize={14} color={"gray.50"}>
					{name}
				</Heading>
				<HStack justifyContent={"flex-end"}>
					<MaterialIcons name="menu-book" size={28} color="white" />
				</HStack>
			</TouchableOpacity>
		</VStack>
	)
}
