import { Route, ReactLocation } from "@tanstack/react-location"
import { Home } from "../pages/Home"
import { Marks } from "../pages/Marks"
import { Sign } from "../pages/Sign"

export const routes: Route[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "sign",
		element: <Sign />,
		caseSensitive: false,
	},
	{
		path: "marks",
		element: <Marks />,
		children: [
			{
				path: ":id",
			},
		],
	},
]

export const location = new ReactLocation()
