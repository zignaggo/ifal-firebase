import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material"
import { Student } from "../../components/Student"
import { Icon } from "@iconify/react"
import { useSidebar } from "../../contexts/SideBarContext"
import { useMatch, useNavigate } from "@tanstack/react-location"
import { routesType } from "../../routes"
import { useEffect, useState } from "react"
import { getDataFirebase, getDiscentes } from "../../utils/utilitys"
import { responseGetDiscentes } from "../../utils/utilitys"
export const Marks = () => {
	const { toggle } = useSidebar()
	const mobile = useMediaQuery("(max-width:767px)", { noSsr: true })
	const navigate = useNavigate()
	const {
		params: { id },
	} = useMatch()
	const routesT = routesType["marks"]
	const name = typeof routesT !== "string" && routesT[id]

	const [data, setData] = useState<{ docente?: string, discentes: responseGetDiscentes[] }>({ discentes: [] })

	useEffect(() => {
		if (typeof (name) == "string") {
			setData({ discentes: [] })
			getDiscentes(name)
				.then(discentes => {
					discentes && setData(prev => ({ ...prev, discentes: [...prev.discentes, ...discentes] }))
					getDataFirebase(`Disciplinas`, name).then(cpfDocente => {
						if (cpfDocente) {
							getDataFirebase("Docentes", String(cpfDocente.docente))
								.then(nameDocente => nameDocente && setData(prev => ({ ...prev, docente: String(nameDocente.nome) })))
						}

					})
				})
		}
	}, [name])

	console.log(data)

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
				<Typography color={"grey.400"} textAlign={"center"}>
					Professor responsável:
				</Typography>
				<Typography color={"grey.50"}>{data?.docente}</Typography>
			</Stack>

			<Stack width={"100%"} gap={2} overflow={"auto"} sx={{
				'::-webkit-scrollbar': {
					width: '0.4em'
				},
				'::-webkit-scrollbar-track': {
					'-webkit-box-shadow': 'inset 0 0 6px grey.900'
				},
				'::-webkit-scrollbar-thumb': {
					backgroundColor: 'grey.400',
					outline: '1px solid grey.900',
					borderRadius: 999
				}
			}}>
				{
					data.discentes.map(({ info }, index) => {
						return <Student key={index} photoUrl={info.photoUrl} n1={info?.n1} n2={info?.n2} rep={info?.rep} final={info?.final} nome={info?.nome} cpf={info?.cpf}
						/>
					})
				}
			</Stack>
		</Stack>
	)
}