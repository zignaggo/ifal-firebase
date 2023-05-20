import { Flex, HStack, Heading, Image, Text, VStack } from "native-base"
import Squares from "../../assets/Squares.png"
import LogoIfal from "../../assets/LogoIfal.png"
import { ReactNode } from "react"
export const ModelLogin = ({ children }: { children: ReactNode }) => {
	return (
		<Flex bg={"gray.800"} w={"full"} h={"full"} justifyContent={"flex-end"}>
			<VStack
				flexGrow={1}
				position={"relative"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Image
					alt={"LogoIfal"}
					position={"absolute"}
					source={LogoIfal}
					zIndex={-1}
					top={"25px"}
					left={"25px"}
					h={"47px"}
					w={"35px"}
				/>
				<Image
					alt={"Quadrados"}
					position={"absolute"}
					source={Squares}
					zIndex={-1}
					top={"10%"}
					left={0}
					h={"400px"}
					w={"full"}
				/>
				<Heading
					color={"gray.50"}
					fontSize={"50px"}
					fontWeight={"400px"}
				>
					Sigaa²
				</Heading>
			</VStack>
			<HStack
				bg={"gray.50"}
				w={"full"}
				px={"25px"}
				py={"30px"}
				minH={"50%"}
				h={"auto"}
				borderRadius={"30px"}
				borderBottomRadius={"0"}
			>
				{children}
			</HStack>
		</Flex>
	)
}
