import {
	Stack,
	Typography,
	useMediaQuery,
	Accordion,
	Avatar,
} from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useCallback, useState } from "react"

export const Student = () => {
	const [expanded, setExpanded] = useState<string | false>(false)

	const handleChange = useCallback(
		(panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false)
		},
		[]
	)

	const mobile = useMediaQuery("(max-width:1200px)", { noSsr: true })

	return mobile ? (
		<Accordion
			expanded={expanded == "panel1"}
			onChange={handleChange("panel1")}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1"
				id="panel1"
			>
				<Stack paddingRight={1}>
					<Stack
						direction={"row"}
						paddingLeft={1}
						alignItems={"center"}
					>
						<Avatar />
						<Stack paddingLeft={1}>
							<Typography color={"grey.600"}>
								Luiz Vinícius Márdelle Costa Silva
							</Typography>
							<Typography color={"grey.500"}>CPF</Typography>
						</Stack>
					</Stack>
				</Stack>

				<Stack
					marginLeft={"auto"}
					marginTop={2}
					height={"100%"}
					justifyContent={"center"}
					paddingRight={2}
				>
					<Typography color={"grey.400"}>Situação</Typography>
				</Stack>
			</AccordionSummary>

			<AccordionDetails>
				<Stack
					paddingLeft={1}
					paddingRight={5}
					justifyContent={"space-between"}
					direction={"row"}
				>
					<Stack direction={"row"}>
						<Stack alignItems={"center"}>
							<Typography color={"grey.400"}>N1</Typography>
							<Typography color={"grey.600"}>nota</Typography>
						</Stack>

						<Stack paddingLeft={2} alignItems={"center"}>
							<Typography color={"grey.400"}>N2</Typography>
							<Typography color={"grey.600"}>nota</Typography>
						</Stack>

						<Stack paddingLeft={2} alignItems={"center"}>
							<Typography color={"grey.400"}>REP</Typography>
							<Typography color={"grey.600"}>nota</Typography>
						</Stack>

						<Stack paddingLeft={2} alignItems={"center"}>
							<Typography color={"grey.400"}>FINAL</Typography>
							<Typography color={"grey.600"}>nota</Typography>
						</Stack>
					</Stack>

					<Stack paddingLeft={1} alignItems={"center"}>
						<Typography color={"grey.400"}>MÉDIA</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>
				</Stack>
			</AccordionDetails>
		</Accordion>
	) : (
		<>
			<Stack
				paddingY={2}
				direction={"row"}
				borderRadius={2}
				justifyContent={"space-between"}
				paddingRight={5}
				bgcolor={"grey.50"}
			>
				<Stack direction={"row"} paddingLeft={1}>
					<Avatar />
					<Stack paddingLeft={1}>
						<Typography color={"grey.600"}>
							Luiz Vinícius Márdelle Costa Silva
						</Typography>
						<Typography color={"grey.500"}>CPF</Typography>
					</Stack>
				</Stack>

				<Stack direction={"row"} marginRight={"10%"}>
					<Stack alignItems={"center"}>
						<Typography color={"grey.400"}>N1</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>

					<Stack paddingLeft={2} alignItems={"center"}>
						<Typography color={"grey.400"}>N2</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>

					<Stack paddingLeft={2} alignItems={"center"}>
						<Typography color={"grey.400"}>REP</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>

					<Stack paddingLeft={2} alignItems={"center"}>
						<Typography color={"grey.400"}>FINAL</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>
					<Stack paddingLeft={2} alignItems={"center"}>
						<Typography color={"grey.400"}>MÉDIA</Typography>
						<Typography color={"grey.600"}>nota</Typography>
					</Stack>
				</Stack>

				<Stack justifyContent={"center"}>
					<Typography color={"grey.400"}>Situação</Typography>
				</Stack>
			</Stack>
		</>
	)
}
