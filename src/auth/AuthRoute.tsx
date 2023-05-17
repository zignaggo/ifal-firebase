import { Navigate } from "@tanstack/react-location"
import { useAuth } from "./useAuth"
export const AuthRoute = ({
	children,
}: {
	authenticated?: boolean
	children: JSX.Element
}) => {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to="/sign" />
	}
	return children
}
