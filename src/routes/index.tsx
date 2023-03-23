import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignUp } from "../screens/SignUp"
import { Sign } from "../screens/Sign"
import { Home } from "../screens/Home"
import { RecoverPassword } from "../screens/RecoverPassword"
type RootStackParamList = {
	Sign: undefined
	SignUp: undefined
	Home: undefined
	RecoverPassword: undefined
	Profile: { userId: string }
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const AppStackNavigator = () => {
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Sign"
				screenOptions={{ headerShown: false }}
			>
				<Screen name="Sign" component={Sign} />
				<Screen name="SignUp" component={SignUp} />
				<Screen name="Home" component={Home} />
				<Screen name="RecoverPassword" component={RecoverPassword} />
			</Navigator>
		</NavigationContainer>
	)
}
