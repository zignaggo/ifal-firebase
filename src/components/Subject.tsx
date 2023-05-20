import { Box, Stack, Typography, useMediaQuery } from "@mui/material"
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
	const mobile = useMediaQuery("(max-width:767px)", { noSsr: true })
	const size = mobile ? "140px" : "200px"

	return (
		<Stack
      bgcolor={color} width={size} height={size}
      borderRadius={6} justifyContent={"space-between"} padding={2} margin={1} onClick={() => navigate({replace: true, to: `marks/${path}`})}
    >
      <Typography
        color={"grey.50"} fontSize={18} 
        fontWeight={"bold"}
      >
        {name}
      </Typography>
      
      <Stack alignSelf={"flex-end"}><Icon width={30} icon="mdi:book-multiple"/></Stack>
    </Stack>
	)
}
