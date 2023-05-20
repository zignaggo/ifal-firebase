import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { DrawerNavigation } from "./DrawerNavigation"
import { NativeBaseProvider } from "native-base"
import { AuthProvider } from "../Contexts/AuthProvider/AuthContext"
import { app, auth } from "../../firebase.config"

describe("Testing Drawer navigation", () => {
	it("screen contains a button linking to my notes page ", async () => {
		const inset = {
			frame: { x: 0, y: 0, width: 0, height: 0 },
			insets: { top: 0, left: 0, right: 0, bottom: 0 },
		}
		const component = (
			<NativeBaseProvider initialWindowMetrics={inset}>
				<AuthProvider authApp={auth}>
					<DrawerNavigation />
				</AuthProvider>
			</NativeBaseProvider>
		)
		render(component)
		const button = screen.getByText("Minhas Notas")

		expect(button)
	})
})
