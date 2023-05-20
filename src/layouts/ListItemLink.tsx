import { ListItemProps, ListItemText, ListItemButton } from "@mui/material"
import { Link, LinkProps } from "@tanstack/react-location"
import { ReactNode, forwardRef } from "react"

interface ListItemLinkProps
	extends Pick<ListItemProps, "sx" | "ref">,
		LinkProps {
	to: string
	title?: string
	selected?: boolean
	rightIcon?: ReactNode
	leftIcon?: ReactNode
}

const LinkBehavior = forwardRef<any, ListItemLinkProps>((props, _) => (
	<Link {...props} />
))

export const ListItemLink = forwardRef<
	Pick<ListItemProps, "sx" | "ref">,
	ListItemLinkProps
>(({ to, title, selected, rightIcon, leftIcon, ...other }, _) => (
	<ListItemButton
		component={LinkBehavior}
		to={to}
		sx={{
			padding: "8px 16px 8px 16px",
		}}
		{...other}
	>
		{leftIcon}
		<ListItemText
			primary={title}
			sx={{ pl: leftIcon ? 1 : 0, span: { lineHeight: "95%" } }}
		/>
		{rightIcon}
	</ListItemButton>
))
