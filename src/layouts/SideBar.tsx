import {
	Stack,
	Drawer,
	List,
	Typography,
	Button,
	useMediaQuery,
	Collapse,
	Avatar,
	IconButton,
} from "@mui/material"
import { Icon, InlineIcon } from "@iconify/react"
import { useLocation } from "@tanstack/react-location"
import { LogoIfal } from "../assets/icons"
import { useCallback, useMemo, useState } from "react"
import { ListItemLink } from "./ListItemLink"
import { useAuth } from "../auth/useAuth"
import LongMenu from "./Menu"
import { useSidebar } from "../contexts/SideBarContext"

export const SideBar = () => {
	const {
		current: { pathname },
	} = useLocation()
	const { open: openDrawer, toggle: toggleDrawer, mobile } = useSidebar()
	const drawerWidth = mobile ? 240 : 280
	const [open, setOpen] = useState<boolean>(true)
	const { logout, user } = useAuth()

	const handleClick = useCallback(() => {
		setOpen((prevOpen) => !prevOpen)
	}, [open])

	const routes: { [key: string]: string } = useMemo(
		() => ({
			"/teste": "teste",
			"/teste2": "teste2",
		}),
		[]
	)
	if (pathname == "/sign") return <></>
	return (
		<Stack flexDirection={"column"}>
			<Drawer
				sx={{
					width: openDrawer ? drawerWidth : 0,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						background: "#292C30",
						borderWidth: 0,
						borderRadius: "0 15px 15px 0 ",
					},
				}}
				variant="persistent"
				anchor="left"
				open={openDrawer}
			>
				<Stack
					flexDirection={"column"}
					flexGrow={1}
					spacing={2}
					padding={"25px"}
				>
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

					<Stack overflow={"auto"}>
						<ListItemLink
							to="/"
							title="Início"
							onClick={handleClick}
							rightIcon={
								<InlineIcon
									icon={
										"material-symbols:keyboard-arrow-down-rounded"
									}
									fontSize={"20px"}
									vFlip={open}
								/>
							}
							leftIcon={
								<InlineIcon
									icon={"octicon:home-fill-24"}
									fontSize={"20px"}
								/>
							}
							sx={{
								height: "45px",
								backgroundColor: "grey.600",
								borderRadius: 2,
								color: "grey.50",
								":hover": {
									backgroundColor: "#33373E",
								},
							}}
						/>
						<Collapse
							in={open}
							timeout="auto"
							unmountOnExit
							sx={{ pl: 2, pt: 1 }}
						>
							<List disablePadding>
								{Object.entries(routes).map((route) => {
									return (
										<ListItemLink
											key={route[0]}
											to={route[0]}
											title={route[1]}
											sx={{
												height: "45px",
												color: "grey.50",
												":hover": {
													backgroundColor: "#33373E",
													borderColor: "grey.400",
												},
												borderLeft: "2px solid",
												borderColor:
													route[0] === pathname
														? "grey.50"
														: "grey.600",
											}}
										/>
									)
								})}
							</List>
						</Collapse>
					</Stack>
				</Stack>
				<Stack
					flexDirection={"row"}
					justifyContent={"space-between"}
					bgcolor={"grey.600"}
					padding={"15px"}
					py={"20px"}
				>
					<Avatar src={user?.photo} />
					<Stack spacing={-1}>
						<Typography fontSize={"18px"} color={"grey.50"}>
							{user?.name}
						</Typography>
						<Typography fontSize={"14px"} color={"grey.400"}>
							{user?.email}
						</Typography>
					</Stack>
					<LongMenu actionOnClose={logout} />
				</Stack>
			</Drawer>
		</Stack>
	)
}
