import { extendTheme } from "native-base"

export const theme = extendTheme({
	colors: {
		gray: {
			50: "#E7E7E7",
			100: "#D6D6D6",
			400: "#808997",
			500: "#535861",
			600: "#353940",
			800: "#202225",
			900: "#232529",
		},
		green: {
			default: "#51BF64",
		},
		red: {
			default: "#E94B4B",
		},
		orange: {
			default: "#D78151"
		}
	},
	config: {
		initialColorMode: "light",
	},
})
