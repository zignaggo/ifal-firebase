import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material"
import { Subject } from "../../components/Subject"
import { useSidebar } from "../../contexts/SideBarContext"
import { Icon } from "@iconify/react"
export const Home = () => {
	const { toggle } = useSidebar()
	const mobile = useMediaQuery("(max-width:767px)", { noSsr: true })
	return (
		<Stack
			padding={mobile ? "20px" : "25px"}
			width={"100%"}
			height={"100%"}
			justifyContent={"flex-start"}
			overflow={"auto"}
		>
			<Stack flexDirection={"row"}>
				{mobile && (
					<IconButton
						onClick={() => toggle((prev) => !prev)}
						sx={{ color: "grey.50" }}
					>
						{<Icon icon={"ci:menu-alt-03"} width={"35px"} />}
					</IconButton>
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
						Matérias disponíveis
					</Typography>
					<Typography
						fontSize={mobile ? "16px" : "24px"}
						color={"grey.400"}
					>
						1º Período
					</Typography>
				</Stack>
			</Stack>

			<Stack
				height={"fit-content"}
				borderRadius={4}
				borderTop={4}
				borderColor={"grey.500"}
				alignContent={"center"}
				padding={1}
				justifyContent={"space-evenly"}
				marginTop={4}
				gap={1.5}
				direction={"row"}
				width={"100%"}
				flexWrap={"wrap"}
				bgcolor={"grey.800"}
			>
				<Subject
					color="#5187D7"
					name="Algoritmo e lógica de programação"
					path="algoritmo"
				/>
				<Subject
					color="#48D1C9"
					name="Fundamentos da matemática"
					path="matematica"
				/>
				<Subject
					color="#D78151"
					name="Fundamentos de sistemas de informação"
					path="fundamentos_si"
				/>
				<Subject
					color="#D15148"
					name="Introdução às tecnologias WEB"
					path="web"
				/>
				<Subject color="#9C51D7" name="Filosofia" path="filosofia" />
			</Stack>
		</Stack>
	)
}
