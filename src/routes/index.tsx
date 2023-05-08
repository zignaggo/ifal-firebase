import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { SignUp } from "../screens/SignUp"
import { Home } from "../screens/Home"
import { Subjects } from "../screens/Subjects"
import { Marks } from "../screens/Marks"
import { RecoverPassword } from "../screens/RecoverPassword"
import { useAuth } from "../Contexts/AuthProvider/useAuth"
import { Sign } from "../screens/Sign"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { CustomDrawer } from "../components/CustomDrawer"
type RootStackParamList = {
	Sign: undefined
	SignUp: undefined
	Home: undefined
	RecoverPassword: undefined
	Profile: { userId: string }
	Subjects: undefined
	Marks: undefined
}

const { Navigator, Screen } = createDrawerNavigator<RootStackParamList>()

export function AppStackNavigator() {
	const { user } = useAuth()
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Sign"
				screenOptions={{
					headerShown: false,
					drawerStyle: {
						backgroundColor: "#202225",
					},
					drawerType: "slide",
					drawerActiveTintColor: "#353940",
					drawerActiveBackgroundColor: "#E7E7E7",
					drawerInactiveTintColor: "#E7E7E7",
					drawerInactiveBackgroundColor: "transparent",
					drawerLabelStyle: {
						marginLeft: -20,
						padding: 0,
					},
					drawerItemStyle: {
						borderRadius: 12,
						margin: 0,
						paddingHorizontal: 6,
						height: 45,
					},

					overlayColor: "transparent",
				}}
				drawerContent={(props) => <CustomDrawer {...props} />}
			>
				{!user ? (
					<>
						<Screen
							name="Sign"
							component={Sign}
							options={{
								swipeEnabled: false,
								drawerStyle: { display: "none" },
							}}
						/>
						<Screen
							name="SignUp"
							component={SignUp}
							options={{
								swipeEnabled: false,
								drawerStyle: { display: "none" },
							}}
						/>
						<Screen
							name="RecoverPassword"
							component={RecoverPassword}
							options={{
								swipeEnabled: false,
								drawerStyle: { display: "none" },
							}}
						/>
					</>
				) : (
					<>
						<Screen
							name="Home"
							component={Home}
							options={{
								drawerIcon: ({ color }) => (
									<FontAwesome
										name="user-circle"
										size={24}
										color={color}
									/>
								),
								title: "Meu Perfil",
							}}
						/>
						<Screen
							name="Subjects"
							component={Subjects}
							options={{
								drawerIcon: ({ color }) => (
									<MaterialCommunityIcons
										name="file-document-edit"
										size={24}
										color={color}
									/>
								),
								title: "Minhas Notas",
							}}
						/>
						<Screen
							name="Marks"
							component={Marks}
							options={{
								drawerLabel: () => null,
								title: null,
								drawerIcon: () => null,
								drawerItemStyle: { height: 0 },
							}}
						/>
					</>
				)}
			</Navigator>
		</NavigationContainer>
	)
}
