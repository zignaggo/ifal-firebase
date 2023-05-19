import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
	Collapse,
	List,
	ListItemProps,
	ListItem,
	ListItemText,
	ListItemButton,
} from "@mui/material"
import { Link as RouterLink } from "@tanstack/react-location"

const breadcrumbNameMap: { [key: string]: string } = {
	"/": "Início",
}

interface ListItemLinkProps extends ListItemProps {
	to: string
	open?: boolean
}

export const ListItemLink = (props: ListItemLinkProps) => {
	const { to, open, ...other } = props
	const primary = breadcrumbNameMap[to]

	let icon = null
	if (open != null) {
		icon = open ? <ExpandLess /> : <ExpandMore />
	}

	return (
		<ListItemButton component={RouterLink as any} to={to} {...other}>
			<ListItemText primary={primary} />
			{icon}
		</ListItemButton>
	)
}
