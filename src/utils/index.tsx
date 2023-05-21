export const recoverCookie = (name: string) => {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith(name))
		?.split("=")[1]
}

export const setCookie = (name: string, value: string, duration: number) => {
	const date = new Date()
	date.setTime(date.getTime() + duration * 60 * 60 * 1000)
	// Resolve wrong hour problem
	const localUTCstring = new Date(
		date.getTime() - date.getTimezoneOffset() * 60000
	)
	const expires = `; Expires=${localUTCstring.toUTCString()}`
	document.cookie = `${name}=${value}; SameSite=Lax; Secure; Path=/; ${expires}`
}

export const eraseCookie = (name: string) => {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}
