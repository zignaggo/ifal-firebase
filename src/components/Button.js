import { ActivityIndicator, TouchableOpacity, Text } from "react-native"

export const ButtonLoader = ({ title, onPress, loading, style, color }) => {
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
