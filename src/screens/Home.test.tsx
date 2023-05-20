import "react-native"
import React, { Component } from "react"
import { NativeBaseProvider } from "native-base"
import { NavigationProp } from "@react-navigation/native"
import { render } from "@testing-library/react-native"
import { AuthProvider } from "../Contexts/AuthProvider/AuthContext"
import { auth } from "../../firebase.config"
import { Home } from "./Home"
type NavigationScreenPropAlias = NavigationProp<{}>

describe("Home must", () => {
	let navigation: Partial<NavigationScreenPropAlias>
	const inset = {
		frame: { x: 0, y: 0, width: 0, height: 0 },
		insets: { top: 0, left: 0, right: 0, bottom: 0 },
	}

	beforeEach(() => {
		navigation = {
			dispatch: jest.fn(),
			navigate: jest.fn(),
		}
	})

	it("render", () => {
		const screen = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<AuthProvider authApp={auth}>
					<Home navigation={navigation} {...navigation} route={{}} />
				</AuthProvider>
			</NativeBaseProvider>
		)
		expect(screen)
	})
})
