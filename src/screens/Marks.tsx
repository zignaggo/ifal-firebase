import { VStack, Text, HStack, Heading, Image } from "native-base"
import { FontAwesome } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import Squares from "../../assets/Squares.png"
import { useEffect, useState, useMemo } from "react"
import {
	ResponseSubject,
	getDataFirebase,
	getSubjectInfo,
} from "../utils/utilitys"
import { getFirestore } from "firebase/firestore"
import { app } from "../../firebase.config"
import { getAuth } from "firebase/auth"
export const Marks = ({ route, navigation }) => {
	const { name } = route.params
	const [infoMark, setInfoMark] = useState<
		{ docente: string; notas: ResponseSubject } | undefined
	>()

	useEffect(() => {
		getSubjectInfo(name, getAuth(app)?.currentUser?.uid).then((notas) => {
			notas && setInfoMark((prev) => ({ ...prev, notas: notas }))
		})

		getDataFirebase(getFirestore(), "Disciplinas", name).then((docente) => {
			docente &&
				getDataFirebase(
					getFirestore(),
					"Docentes",
					String((docente as { docente: number }).docente)
				).then((dados) =>
					setInfoMark((prev) => ({ ...prev, docente: dados.nome }))
				)
		})
	}, [route])

	const media = useMemo(() => {
		if (!infoMark || !infoMark.notas) return -1
		if (Number(infoMark.notas.final) >= 0) return infoMark.notas.final
		let n1 = Number(infoMark.notas.n1)
		let n2 = Number(infoMark.notas.n2)

		if ((n1 == -1 || n2 == -1) && infoMark.notas.rep >= 0) {
			if (n1 == -1) {
				n1 = infoMark.notas.rep
			} else {
				n2 = infoMark.notas.rep
			}
		}

		return (n1 + n2) / 2
	}, [infoMark])

	const status = useMemo(() => {
		if (!infoMark) return "MATRICULADO"
		if (!infoMark.notas.n1 && !infoMark.notas.n2) return "MATRICULADO"
		if (media < 7) return "REPROVADO"
		return "APROVADO"
	}, [infoMark, media])
	return (
		<VStack
			safeArea
			w={"full"}
			minH={"full"}
			bgColor={"gray.900"}
			p={7}
			position={"relative"}
		>
			<VStack paddingBottom={15}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Subjects")}
				>
					<FontAwesome
						name="long-arrow-left"
						size={24}
						color="white"
					/>
				</TouchableOpacity>
			</VStack>

			<Heading
				paddingBottom={10}
				textAlign={"center"}
				fontSize={22}
				color={"gray.50"}
			>
				{name}
			</Heading>

			<VStack
				bg={"gray.500"}
				alignItems={"center"}
				marginBottom={7}
				borderRadius={8}
			>
				<Heading paddingY={3} fontSize={18} color={"gray.50"}>
					Docente
				</Heading>
				<Text paddingBottom={3} fontSize={14} color={"gray.100"}>
					{infoMark?.docente}
				</Text>
			</VStack>

			<VStack flexGrow={1} justifyContent={"space-between"}>
				<VStack>
					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Nota 1</Heading>
						<Text fontSize={14}>
							{infoMark && infoMark?.notas.n1 < 0
								? "-"
								: infoMark?.notas.n1.toFixed(2)}
						</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Nota 2</Heading>
						<Text fontSize={14}>
							{infoMark && infoMark?.notas.n2 < 0
								? "-"
								: infoMark?.notas.n2.toFixed(2)}
						</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Reposição</Heading>
						<Text fontSize={14}>
							{infoMark && infoMark?.notas.rep < 0
								? "-"
								: infoMark?.notas.rep.toFixed(2)}
						</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.50"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading fontSize={18}>Final</Heading>
						<Text fontSize={14}>
							{infoMark && infoMark?.notas.final < 0
								? "-"
								: infoMark?.notas.final.toFixed(2)}
						</Text>
					</VStack>

					<VStack
						p={3}
						bg={"gray.600"}
						marginBottom={2}
						borderRadius={8}
					>
						<Heading color={"gray.50"} fontSize={18}>
							Média
						</Heading>
						<HStack justifyContent={"space-between"}>
							<Text fontSize={14} color={"gray.50"}>
								{media.toFixed(2)}
							</Text>
							<Text fontSize={14} color={"gray.400"}>
								Mínimo: 7,00
							</Text>
						</HStack>
					</VStack>
				</VStack>
				<VStack
					alignItems={"center"}
					justifyContent={"center"}
					borderRadius={8}
					bgColor={
						status === "REPROVADO"
							? "red.default"
							: status === "APROVADO"
							? "green.default"
							: "orange.default"
					}
					height={"68px"}
				>
					<Text bold fontSize={18}>
						Situação
					</Text>
					<Text color={"gray.900"}>{status}</Text>
				</VStack>
			</VStack>
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
