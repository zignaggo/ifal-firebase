import { useState, useEffect } from "react"

type ReturnType<T> = [
	T | undefined,
	React.Dispatch<React.SetStateAction<T | undefined>>,
	() => void
]

export const useLocalStorage = <T,>(
	key: string,
	initialValue?: T
): ReturnType<T> => {
	const [state, setState] = useState<T | undefined>(() => {
		let currentValue
		try {
			currentValue = JSON.parse(
				localStorage.getItem(key) || String(initialValue)
			)
		} catch (error) {
			currentValue = initialValue
		}

		return currentValue
	})

	const reset = () => {
		localStorage.removeItem(key)
		setState(undefined)
	}

	useEffect(() => {
		if (state) {
			try {
				localStorage.setItem(key, JSON.stringify(state))
			} catch (error) {
				console.log(error)
			}
		}
	}, [state, key])

	return [state, setState, reset]
}
