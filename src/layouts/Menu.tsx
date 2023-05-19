import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const options = ["Sair"]

const ITEM_HEIGHT = 48

export default function LongMenu({
	actionOnClose,
}: {
	actionOnClose: () => void
}) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
		actionOnClose()
	}

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				sx={{
					color: "grey.50",
				}}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				elevation={0}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						margin: 0,
						background: "transparent",
					},
					sx: {
						ul: {
							padding: 0,
							color: "grey.50",
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
			>
				{options.map((option) => (
					<MenuItem
						key={option}
						onClick={handleClose}
						sx={{
							backgroundColor: "error.main",
							":hover": {
								backgroundColor: "error.main",
							},
						}}
					>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}
