import React from "react"
import { NativeBaseProvider } from "native-base"
import "react-native"
import { ButtonLoader } from "./Button"
import { render } from "@testing-library/react-native"

describe("Button Component", () => {
	it("rendered", () => {
		const inset = {
			frame: { x: 0, y: 0, width: 0, height: 0 },
			insets: { top: 0, left: 0, right: 0, bottom: 0 },
		}

		render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<ButtonLoader
					color="#fff"
					loading
					onPress={() => console.log("")}
					title=""
				/>
			</NativeBaseProvider>
		)
	})
})
