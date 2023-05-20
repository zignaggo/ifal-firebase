import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import { useMediaQuery } from "@mui/material"

type TypeSideBarContext = {
	open: boolean
	toggle: Dispatch<SetStateAction<boolean>>
	mobile: boolean
}

const SidebarContext = createContext<TypeSideBarContext>(
	{} as TypeSideBarContext
)

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
	const mobile = useMediaQuery("(max-width:600px)", { noSsr: true })
	const [open, toggle] = useState<boolean>(!mobile)

	useEffect(() => {
		toggle(!mobile)
	}, [mobile])
	return (
		<SidebarContext.Provider value={{ open, toggle, mobile }}>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebar = () => {
	return useContext(SidebarContext)
}
