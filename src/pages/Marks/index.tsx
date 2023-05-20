import { Box, Stack, Typography } from "@mui/material"
import { Student } from "../../components/Student"

export const Marks = () => {
	return (
		<Stack
			alignItems={"center"}
			color={"grey.50"}
			width={"100%"}
			height={"100%"}
			padding={2}
		>
			<Typography
				marginTop={3}
				alignSelf={"flex-start"}
				color={"grey.50"}
				fontSize={"32px"}
			>
				Nome matéria
			</Typography>

			<Stack
				marginY={5}
				padding={2}
				borderRadius={"8px"}
				alignItems={"center"}
				justifyItems={"center"}
				bgcolor={"grey.600"}
				width={"60%"}
			>
				<Typography color={"grey.400"}>
					Professor responsável:
				</Typography>
				<Typography color={"grey.50"}>Glevson Pinto</Typography>
			</Stack>

			<Stack width={"100%"}>
				<Student />
			</Stack>
		</Stack>
	)
}
