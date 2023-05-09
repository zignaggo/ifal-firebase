import React from "react"
import { NativeBaseProvider } from "native-base"
import "react-native"
import { Subject } from "./Subject"
import { render } from "@testing-library/react-native"

test("componente matéria", () => {})

describe("Mark Component", () => {
	it("rendered", () => {
		const inset = {
			frame: { x: 0, y: 0, width: 0, height: 0 },
			insets: { top: 0, left: 0, right: 0, bottom: 0 },
		}

		render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Subject color={"#fff"} name={"a"} />
			</NativeBaseProvider>
		)
	})
})
