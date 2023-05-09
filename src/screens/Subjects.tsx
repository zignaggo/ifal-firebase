import { VStack, HStack, Heading, Image } from "native-base"
import { Subject } from "../components/Subject"
import { Ionicons } from "@expo/vector-icons"
import Squares from "../../assets/Squares.svg"
export const Subjects = ({ navigation }) => {
	return (
		<VStack
			safeArea
			w={"full"}
			h={"full"}
			bgColor={"gray.900"}
			p={4}
			position={"relative"}
		>
			<HStack>
				<Ionicons
					name="md-reorder-two-sharp"
					size={34}
					color="#E7E7E7"
					onPress={() => navigation.openDrawer()}
				/>
			</HStack>
			<Heading color={"gray.50"} textAlign={"center"} paddingBottom={18}>
				Minhas notas
			</Heading>

			<HStack
				flexWrap={"wrap"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Subject
					// color="#5187D7"
					// name="Algoritmo e lógica de programação"
					// navigation={navigation}
				/>
				<Subject
					// color="#48D1C9"
					// name="Fundamentos da matemática"
					// navigation={navigation}
				/>
				<Subject
					// color="#D78151"
					// name="Fundamentos de sistemas de informação"
					// navigation={navigation}
				/>
				<Subject
					// color="#D15148"
					// name="Introdução às tecnologias WEB"
					// navigation={navigation}
				/>
				<Subject
					// color="#9C51D7"
					// name="Filosofia"
					// navigation={navigation}
				/>
				<Subject
					// color="#78C03F"
					// name="Inglês técnico"
					// navigation={navigation}
				/>
			</HStack>

			<Image
				position={"absolute"}
				alt={"Quadrados"}
				zIndex={-1}
				width={"full"}
				height={"400px"}
				bottom={0}
				left={0}
				source={Squares}
			/>
		</VStack>
	)
}
