import { NavigationContainer } from "@react-navigation/native"
import { SignUp } from "../screens/SignUp"
import { RecoverPassword } from "../screens/RecoverPassword"
import { Sign } from "../screens/Sign"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

type RootStackParamList = {
	Sign: undefined
	SignUp: undefined
	RecoverPassword: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const StackNavigation = () => {
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Sign"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Screen name="Sign" component={Sign} />
				<Screen name="SignUp" component={SignUp} />
				<Screen name="RecoverPassword" component={RecoverPassword} />
			</Navigator>
		</NavigationContainer>
	)
}
