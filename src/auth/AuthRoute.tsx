import { Navigate } from "@tanstack/react-location"
import { useAuth } from "./useAuth"
export const AuthRoute = ({
	children,
}: {
	authenticated?: boolean
	children: JSX.Element
}) => {
	const {
		user: { uid },
	} = useAuth()

	if (!uid) {
		return <Navigate to="/sign" />
	}
	return children
}
