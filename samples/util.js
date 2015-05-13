export function par(...args) {
	return Promise.all(args)
}

export function asap() {
	return Promise.resolve()
}

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function wait(ms) {
	return v => sleep(ms).then(() => v)
}
