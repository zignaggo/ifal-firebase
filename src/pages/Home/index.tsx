import { Stack, Typography } from "@mui/material"
import { Subject } from "../../components/Subject"
export const Home = () => {
	return (
		<Stack 
			width={"100%"} height={"100%"} justifyContent={"flex-start"} paddingLeft={3} overflow={"auto"}
		>
			<Typography marginTop={3}
				fontWeight={"bold"} fontSize={"32px"} color={"grey.50"}>Matérias disponíveis
			</Typography>
			<Typography 
				fontSize={"24px"} color={"grey.400"}>
				1º Período
			</Typography>
			
			<Stack height={"fit-content"} borderRadius={4} borderTop={4} borderColor={"grey.500"} alignContent={"center"} padding={1} justifyContent={"space-evenly"} marginTop={4} direction={"row"} width={"95%"} flexWrap={"wrap"} bgcolor={"grey.800"}>
				<Subject color="#5187D7" name="Algoritmo e lógica de programação" path="algoritmo" />
				<Subject color="#48D1C9" name="Fundamentos da matemática" path="fund_mat" />
				<Subject color="#D78151" name="Fundamentos de sistemas de informação" path="fund_sist" />
				<Subject color="#D15148" name="Introdução às tecnologias WEB" path="WEB" />
				<Subject color="#9C51D7" name="Filosofia" path="filo" />

			</Stack>
		</Stack>
	)
}
