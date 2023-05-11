import { Navigate, Outlet } from "@tanstack/react-location"
export const AuthRoute = ({
	authenticated = false,
	children,
}: {
	authenticated?: boolean
	children: JSX.Element
}) => {
	if (!authenticated) {
		return <Navigate to="/sign" />
	}
	return children
}
