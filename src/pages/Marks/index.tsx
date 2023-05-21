import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material"
import { Student } from "../../components/Student"
import { Icon } from "@iconify/react"
import { useSidebar } from "../../contexts/SideBarContext"
import { useMatch, useNavigate } from "@tanstack/react-location"
import { routesType } from "../../routes"
export const Marks = () => {
	const { toggle } = useSidebar()
	const mobile = useMediaQuery("(max-width:767px)", { noSsr: true })
	const navigate = useNavigate()
	const {
		params: { id },
	} = useMatch()
	const routesT = routesType["marks"]
	const name = typeof routesT !== "string" && routesT[id]
	return (
		<Stack
			alignItems={"center"}
			color={"grey.50"}
			width={"100%"}
			height={"100%"}
			padding={"25px"}
		>
			<Stack
				flexDirection={"row"}
				width={"100%"}
				alignItems={"center"}
				gap={"10px"}
			>
				{mobile ? (
					<IconButton
						onClick={() => toggle((prev) => !prev)}
						sx={{ color: "grey.50" }}
					>
						{
							<Icon
								icon={"ci:menu-alt-03"}
								width={"35px"}
								min={"35px"}
							/>
						}
					</IconButton>
				) : (
					<Icon
						icon="maki:arrow"
						hFlip={true}
						width={"25px"}
						onClick={() => navigate({ replace: true, to: "/" })}
					/>
				)}
				<Stack
					spacing={0}
					marginLeft={mobile ? "auto" : 0}
					textAlign={mobile ? "right" : "left"}
					justifyContent={"center"}
				>
					<Typography
						fontWeight={"bold"}
						fontSize={mobile ? "24px" : "32px"}
						lineHeight={mobile ? "24px" : "32px"}
						color={"grey.50"}
					>
						{name}
					</Typography>
				</Stack>
			</Stack>

			<Stack
				marginTop={2}
				marginBottom={4}
				padding={2}
				borderRadius={"8px"}
				alignItems={"center"}
				justifyItems={"center"}
				bgcolor={"grey.600"}
				width={"250px"}
			>
				<Typography color={"grey.400"}>
					Professor responsável:
				</Typography>
				<Typography color={"grey.50"}>Glevson Pinto</Typography>
			</Stack>

			<Stack width={"100%"} gap={2}>
				<Student />
				<Student />
			</Stack>
		</Stack>
	)
}
