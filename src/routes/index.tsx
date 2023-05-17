import { Route, ReactLocation } from "@tanstack/react-location"
import { Home } from "../pages/Home"
import { Marks } from "../pages/Marks"
import { Sign } from "../pages/Sign"
import { AuthRoute } from "../auth/AuthRoute"

export const routes: Route[] = [
	{
		path: "/",
		element: (
			<AuthRoute>
				<Home />
			</AuthRoute>
		),
	},

	{
		path: "sign",
		element: <Sign />,
		caseSensitive: false,
	},
	{
		path: "marks",
		element: (
			<AuthRoute>
				<Marks />
			</AuthRoute>
		),
		children: [
			{
				path: ":id",
			},
		],
	},
	{
		path: "*",
		element: (
			<AuthRoute>
				<Home />
			</AuthRoute>
		),
	},
]

export const location = new ReactLocation()
