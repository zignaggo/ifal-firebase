import { Box, Stack, Typography } from "@mui/material"
import theme from "../config/theme"
import { Icon } from "@iconify/react"
import { useNavigate } from "@tanstack/react-location"

export const Subject = ({
	name,
	color,
	path,
}: {
	name: string
	color: string
	path: string | number
}) => {
	const navigate = useNavigate()

	return (
		<Stack
			bgcolor={color}
			width={"170px"}
			height={"170px"}
			borderRadius={6}
			justifyContent={"space-between"}
			padding={2}
			margin={1}
			onClick={() => navigate({ replace: true, to: `marks/${path}` })}
			sx={{
				cursor: "pointer",
			}}
		>
			<Typography color={"grey.50"} fontSize={18} fontWeight={"bold"}>
				{name}
			</Typography>

			<Stack alignSelf={"flex-end"}>
				<Icon width={30} icon="mdi:book-multiple" />
			</Stack>
		</Stack>
	)
}
