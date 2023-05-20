import React, { Component } from "react"
import { NativeBaseProvider } from "native-base"
import "react-native"
import { NavigationProp } from "@react-navigation/native"
import { render, fireEvent } from "@testing-library/react-native"
import { Subjects } from "./Subjects"
import { Marks } from "./Marks"
type NavigationScreenPropAlias = NavigationProp<{}>

describe("Subject must", () => {
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

	it("render Filosofia's mark when clicked component ", () => {
		const screen = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Subjects navigation={navigation} {...navigation} />
			</NativeBaseProvider>
		)

		fireEvent.press(screen.getByText("Filosofia"))

		const component = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Marks
					navigation={navigation}
					route={{ params: "Filosofia" }}
				/>
			</NativeBaseProvider>
		)

		expect(component)
	})

	it("render Filosofia's mark when clicked component ", () => {
		const component = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Marks
					navigation={navigation}
					route={{ params: { name: "Filosofia" } }}
				/>
			</NativeBaseProvider>
		)

		expect(component.getByText("Filosofia"))
	})
})
