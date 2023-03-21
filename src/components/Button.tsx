import {
	ActivityIndicator,
	TouchableOpacity,
	Text,
	GestureResponderEvent,
	StyleProp,
	ViewStyle,
} from "react-native"

interface PropsButtonLoader {
	title: string
	onPress: (event: GestureResponderEvent) => void
	loading: boolean
	style: StyleProp<ViewStyle>
	color: string
}

export const ButtonLoader = ({
	title,
	onPress,
	loading,
	style,
	color,
}: PropsButtonLoader) => {
	return (
		<TouchableOpacity onPress={onPress} style={style}>
			{loading ? (
				<ActivityIndicator size={"small"} color={color} />
			) : (
				<Text style={{ color: color }}>{title}</Text>
			)}
		</TouchableOpacity>
	)
}
