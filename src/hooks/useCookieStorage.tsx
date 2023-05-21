import { useEffect, useState } from "react"
import {
	recoverCookie,
	setCookie as setCookieUtils,
	eraseCookie,
} from "../utils"

type ReturnType = [
	string | undefined,
	React.Dispatch<React.SetStateAction<string | undefined>>,
	() => void
]

export const UseCookieStorage = (
	key: string,
	duration: number,
	initialValue?: string
): ReturnType => {
	const [cookie, setCookie] = useState<string | undefined>(() => {
		let currentValue
		try {
			currentValue = recoverCookie(key)
		} catch (error) {
			currentValue = initialValue
		}

		return currentValue
	})

	const reset = () => {
		eraseCookie(key)
		setCookie(undefined)
	}

	useEffect(() => {
		console.log(cookie)
		if (cookie) {
			try {
				setCookieUtils(key, cookie, duration)
			} catch (error) {
				console.log(error)
			}
		}
	}, [cookie, key])

	return [cookie, setCookie, reset]
}
