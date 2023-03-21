import { TextInput, StyleSheet, View, StyleProp, ViewStyle } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { forwardRef, LegacyRef, useState } from "react"

interface IInput {
	password?: boolean
	placeholder: string
	style?: StyleProp<ViewStyle>
	ref: LegacyRef<TextInput>
}

export const Input = forwardRef(({password = false,
	placeholder,
	style,
	ref,}: IInput) => {
	const [show, toggleShow] = useState(false)
	return (
		<View style={[style, styles.container]}>
			<TextInput
				secureTextEntry={show}
				placeholder={placeholder}
				style={styles.input}
				ref={ref}
			></TextInput>
			{password && (
				<AntDesign
					name={show ? "eye" : "eyeo"}
					size={24}
					color="black"
					onPress={() => toggleShow(!show)}
				/>
			)}
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#0002",
		paddingLeft: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 20,
		padding: 0,
	},
	input: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})
