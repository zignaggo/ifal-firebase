import {
	Input as NativeBaseInput,
	IInputProps,
	Text,
	InputGroup,
} from "native-base"
import { FormControl } from "native-base"

interface IInput extends IInputProps {
	errorMessage?: string | null
	title: string
}

export const Input = ({
	errorMessage = null,
	isInvalid,
	title,
	...rest
}: IInput) => {
	const invalid = !!errorMessage || isInvalid

	return (
		<FormControl isInvalid={invalid}>
			<InputGroup
				position={"relative"}
				h={50}
				borderRadius={"10px"}
				w={"full"}
				overflowX={"hidden"}
				p={0}
				m={0}
			>
				<NativeBaseInput
					{...rest}
					pt={"15px"}
					w={"full"}
					pb={"5px"}
					px={"10px"}
					borderRadius={"8px"}
					_focus={{
						borderColor: "gray.400",
						borderWidth: 1,
						focusOutlineColor: "gray.400",
						bg: "gray.100",
					}}
					_invalid={{
						borderColor: "red.300",
					}}
				/>
				<Text
					position={"absolute"}
					top={"5px"}
					left={"10px"}
					fontSize={"12px"}
					color={"gray.400"}
				>
					{title}
				</Text>
			</InputGroup>

			<FormControl.ErrorMessage mt={"1px"}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	)
}
