import { Box, Button, Typography } from "@mui/material"
import { useAuth } from "../../auth/useAuth"
export const Home = () => {
	const { logout } = useAuth()
	return (
		<Box color={"grey.50"}>
			<Typography>Home</Typography>
			<Button variant="contained" onClick={() => logout()}>
				Sair
			</Button>
		</Box>
	)
}
