import { Route, ReactLocation } from "@tanstack/react-location"
import { Home } from "../pages/Home"
import { Marks } from "../pages/Marks"
import { Sign } from "../pages/Sign"
import { AuthRoute } from "../auth/AuthRoute"

export const routesType: Record<string, string | Record<string, string>> = {
	"/": "Início",
	marks: {
		algoritmo: "Algoritmo e lógica de programação",
		matematica: "Fundamentos da matemática",
		fundamentos_si: "Fundamentos de sistemas de informação",
		web: "Introdução às tecnologias WEB",
		filosofia: "Filosofia",
	},
}

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
		children: [
			{
				path: ":id",
				element: (
					<AuthRoute>
						<Marks />
					</AuthRoute>
				),
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
