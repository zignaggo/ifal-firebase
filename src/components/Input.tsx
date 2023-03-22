import { Input as NativeBaseInput, IInputProps } from "native-base"
import { FormControl } from "native-base"

interface IInput extends IInputProps {
	errorMessage?: string | null
}

export function Input({  errorMessage = null , isInvalid,...rest}: IInput) {
	const invalid = !!errorMessage ||  isInvalid

	return (
		<FormControl isInvalid={invalid}>
			<NativeBaseInput
				{...rest}
				rounded={"10px"}
				h={45}
				w={"full"}
				_focus={{
					borderColor: "#d27",
					borderWidth: 1,
					focusOutlineColor: "#d27",
					bg: "gray.100",
				}}

				_invalid={{
					borderColor: "red.300"
				}}
			/>
			<FormControl.ErrorMessage>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	)
}
