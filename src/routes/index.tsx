import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignUp } from "../screens/SignUp"
import { Home } from "../screens/Home"
import { Subjects } from "../screens/Subjects"
import { Marks } from "../screens/Marks"
import { RecoverPassword } from "../screens/RecoverPassword"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { Sign } from "../screens/Sign"
type RootStackParamList = {
	Sign: undefined
	SignUp: undefined
	Home: undefined
	RecoverPassword: undefined
	Profile: { userId: string }
	Subjects: undefined
	Marks: undefined
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
					<>
						<Screen name="Subjects" component={Subjects} />
						<Screen name="Marks" component={Marks} />
						<Screen name="Home" component={Home} />
					</>
				)}
			</Navigator>
		</NavigationContainer>
	)
}
