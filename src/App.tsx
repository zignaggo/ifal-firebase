import { Outlet, Router } from "@tanstack/react-location"
import { Box } from "@mui/material"
import { routes, location } from "./routes"
import { AuthProvider } from "./auth/useAuth"
import { SideBar } from "./layouts/SideBar"
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
					<SideBar />
					<Outlet />
				</AuthProvider>
			</Router>
		</Box>
	)
}
