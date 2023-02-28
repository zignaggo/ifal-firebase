import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignUp } from "../screens/SignUp"
import { Sign } from "../screens/Sign"
import { Home } from "../screens/Home"

const { Navigator, Screen } = createNativeStackNavigator()

export const AppStackNavigator = () => {
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="sign"
				screenOptions={{ headerShown: false }}
			>
				<Screen name="sign" component={Sign} />
				<Screen name="signUp" component={SignUp} />
				<Screen name="home" component={Home} />
			</Navigator>
		</NavigationContainer>
	)
}
