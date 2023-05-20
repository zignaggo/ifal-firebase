import { Stack, Typography } from "@mui/material"
import { Student } from "../../components/Student"
import { Icon } from "@iconify/react"

export const Marks = () => {
	return (
		<Stack alignItems={"center"} color={"grey.50"} width={"100%"} height={"100%"} padding={2} >
			<Stack flexDirection={"row"} alignItems={"center"} width={"100%"}>
				<Icon icon="maki:arrow" hFlip={true} />
				<Typography marginLeft={"auto"} marginRight={"auto"} color={"grey.50"} fontSize={"32px"}>
					Nome matéria
				</Typography>
			</Stack>

			<Stack marginTop={2} marginBottom={4} padding={2} borderRadius={"8px"} alignItems={"center"} justifyItems={"center"} bgcolor={"grey.600"} width={"250px"}>
				<Typography color={"grey.400"}>
					Professor responsável:
				</Typography>
				<Typography color={"grey.50"}>
					Glevson Pinto
				</Typography>
			</Stack>

			<Stack width={"100%"} gap={2}>
				<Student />
				<Student />
			</Stack>
		</Stack>
	)
}