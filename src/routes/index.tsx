import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignUp } from "../screens/SignUp"
import { Sign } from "../screens/Sign"
import { Home } from "../screens/Home"
import { RecoverPassword } from "../screens/RecoverPassword"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { useEffect } from "react"
type RootStackParamList = {
	Sign: undefined
	SignUp: undefined
	Home: undefined
	RecoverPassword: undefined
	Profile: { userId: string }
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export function AppStackNavigator() {
	const { user } = useAuth()
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Sign"
				screenOptions={{ headerShown: false }}
			>
				{!user ? (
					<>
						<Screen name="Sign" component={Sign} />
						<Screen name="SignUp" component={SignUp} />
						<Screen
							name="RecoverPassword"
							component={RecoverPassword}
						/>
					</>
				) : (
					<Screen name="Home" component={Home} />
				)}
			</Navigator>
		</NavigationContainer>
	)
}
