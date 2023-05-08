import {
	VStack,
	HStack,
	Heading,
	Image,
} from "native-base"
import { theme } from "../config/theme"
import { Subject } from "../components/Subject"
import { Ionicons } from "@expo/vector-icons"

export const Subjects = ({ route, navigation }) => {
	return (
		<VStack
			w={"full"}
			h={"full"}
			bgColor={"gray.900"}
			p={4}
			safeArea
			position={"relative"}
		>
			<HStack justifyContent={"space-between"} alignItems={"center"}>
				<Ionicons
					name="md-reorder-two-sharp"
					size={34}
					color="#E7E7E7"
					onPress={() => navigation.openDrawer()}
				/>
			</HStack>
			<Heading
				color={theme.colors.gray[50]}
				textAlign={"center"}
				paddingBottom={18}
			>
				Minhas notas
			</Heading>

			<HStack
				flexWrap={"wrap"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Subject
					color="#5187D7"
					name="Algoritmo e lógica de programação"
					route={route}
					navigation={navigation}
				/>
				<Subject
					color="#48D1C9"
					name="Fundamentos da matemática"
					route={route}
					navigation={navigation}
				/>
				<Subject
					color="#D78151"
					name="Fundamentos de sistemas de informação"
					route={route}
					navigation={navigation}
				/>
				<Subject
					color="#D15148"
					name="Introdução às tecnologias WEB"
					route={route}
					navigation={navigation}
				/>
				<Subject
					color="#9C51D7"
					name="Filosofia"
					route={route}
					navigation={navigation}
				/>
				<Subject
					color="#78C03F"
					name="Inglês técnico"
					route={route}
					navigation={navigation}
				/>
			</HStack>

			<Image
				position={"absolute"}
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
