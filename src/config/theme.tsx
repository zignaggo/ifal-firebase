declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		start: true
		xs: true
		sm: true
		md: true
		lg: true
		xl: true
	}
}

import { createTheme } from "@mui/material/styles"

const theme = createTheme({
	palette: {
		success: {
			main: "#51BF64",
		},
		error: {
			main: "#E94B4B",
		},
		grey: {
			50: "#E7E7E7",
			100: "#D6D6D6",
			400: "#808997",
			500: "#535861",
			600: "#353940",
			800: "#232529",
			900: "#202225",
		},
	},
	breakpoints: {
		values: {
			start: 0,
			xs: 400,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
})

export default theme
