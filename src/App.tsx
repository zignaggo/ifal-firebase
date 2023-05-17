import { Outlet, Router } from "@tanstack/react-location"
import { Box } from "@mui/material"
import { routes, location } from "./routes"
import { AuthProvider } from "./auth/useAuth"
export default function App() {
	return (
		<Box
			bgcolor={"grey.900"}
			width={"100vw"}
			height={"100vh"}
			color={"grey.50"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<Router routes={routes} location={location}>
				<AuthProvider>
					<Outlet />
				</AuthProvider>
			</Router>
		</Box>
	)
}
