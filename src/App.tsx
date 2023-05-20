import { Outlet, Router } from "@tanstack/react-location"
import { Box } from "@mui/material"
import { routes, location } from "./routes"
import { AuthProvider } from "./auth/useAuth"
import { SideBar } from "./layouts/SideBar"
import { SideBarProvider } from "./contexts/SideBarContext"
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
					<SideBarProvider>
						<SideBar />
						<Outlet />
					</SideBarProvider>
				</AuthProvider>
			</Router>
		</Box>
	)
}
