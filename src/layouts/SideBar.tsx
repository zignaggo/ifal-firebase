import {
	Stack,
	Drawer,
	List,
	Typography,
	Button,
	useMediaQuery,
	Collapse,
} from "@mui/material"
import { Icon } from "@iconify/react"
import { useLocation } from "@tanstack/react-location"
import { LogoIfal } from "../assets/icons"
import { useState } from "react"
import { ListItemLink } from "./ListItemLink"
import { useAuth } from "../auth/useAuth"

export const SideBar = () => {
	const {
		current: { pathname },
	} = useLocation()
	const mobile = useMediaQuery("(max-width:600px)")
	const drawerWidth = mobile ? 200 : 260
	const [open, setOpen] = useState<boolean>(true)
	const { logout } = useAuth()
	const handleClick = () => {
		setOpen((prevOpen) => !prevOpen)
	}
	if (pathname == "/sign") return <></>
	return (
		<Stack flexDirection={"column"}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						background: "#292C30",
						borderWidth: 0,
						borderRadius: "0 15px 15px 0 ",
						padding: "25px",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Stack flexDirection={"column"} flexGrow={1} spacing={2}>
					<Stack
						direction={"row"}
						alignItems={"center"}
						spacing={1}
						justifyContent={"center"}
					>
						<LogoIfal width="25px" />
						<Typography
							variant="BreeSerif"
							fontSize={24}
							color={"#fff"}
						>
							Sigaa²
						</Typography>
					</Stack>
					<Collapse
						component="li"
						in={open}
						timeout="auto"
						unmountOnExit
					>
						<List disablePadding>
							<ListItemLink sx={{ pl: 4 }} to="/" />
							<ListItemLink sx={{ pl: 4 }} to="/teste" />
						</List>
					</Collapse>
				</Stack>
				<Button
					variant="contained"
					color="error"
					onClick={() => logout()}
					sx={{
						textTransform: "none",
					}}
					startIcon={
						<Icon
							icon={"majesticons:door-exit"}
							width={"20px"}
							height={"20px"}
						/>
					}
				>
					<Typography>Sair</Typography>
				</Button>
			</Drawer>
		</Stack>
	)
}
