import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { StackNavigation } from "./StackNavigation"
import { DrawerNavigation } from "./DrawerNavigation"
export const MainNavigation = () => {
	const { user } = useAuth()
	return !user ? <StackNavigation /> : <DrawerNavigation />
}
