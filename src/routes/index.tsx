import {
	Route,
	ReactLocation,
	Outlet,
	Navigate,
} from "@tanstack/react-location"
import { Home } from "../pages/Home"
import { Marks } from "../pages/Marks"
import { Sign } from "../pages/Sign"
import { AuthRoute } from "../auth/AuthRoute"

const authenticated = false

export const routes: Route[] = [
	{
		path: "/",
		element: (
			<AuthRoute authenticated={authenticated}>
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
			<AuthRoute authenticated={authenticated}>
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
			<AuthRoute authenticated={authenticated}>
				<Home />
			</AuthRoute>
		),
	},
]

export const location = new ReactLocation()
