import { NavigationContainer } from "@react-navigation/native"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { Home } from "../screens/Home"
import { Subjects } from "../screens/Subjects"
import { Marks } from "../screens/Marks"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { CustomDrawer } from "../components/CustomDrawer"

export type RootDrawerParamList = {
	Home: undefined
	Subjects: undefined
	Marks: { name: string }
}

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>()

export const DrawerNavigation = () => {
	return (
		<NavigationContainer>
			<Navigator
				initialRouteName="Home"
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
			</Navigator>
		</NavigationContainer>
	)
}
