export default function async(generator) {
	return function (...args) {
		const it = generator(...args)
		return new Promise((resolve, reject) => {

			it_next()

			function nextStep({done, value}) {
				if (done) resolve(value)
				else {
					try {
						Promise.resolve(value).then(it_next, it_throw)
					} catch (e) {
						it_throw(e)
					}
				}
			}

			function it_next(v) {
				try {
					return nextStep(it.next(v))
				} catch (e) {
					return it_throw(e)
				}
			}

			function it_throw(v) {
				try {
					return nextStep(it.throw(v))
				} catch (e) {
					reject(e)
					it.return()
				}
			}

		})
	}
}
