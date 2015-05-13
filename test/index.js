let tests = Promise.resolve()

function test(name, asyncFunc) {
	tests = tests.then(() => {
		console.log('#', name)
		return asyncFunc()
			.then(result => console.log('Result:', result))
			.catch(e => console.error('Error:', e.stack || e))
			.then(() => console.log())
	})
}


import async from '../src'

test('test1', async(function *() {
	const x = yield Promise.resolve('x')
	const y = yield Promise.resolve('y')
	return x + y
}))

test('test2', async(function *() {
	const x = yield Promise.resolve('x')
	const y = yield Promise.reject('y')
	return x + y
}))

test('test3', async(function *() {
	const x = yield Promise.resolve('x')
	let y
	try {
		y = yield Promise.reject('y')
	} catch (e) {
		y = 'Y'
	}
	return x + y
}))

test('test4', async(function *() {
	const x = yield Promise.resolve('x')
	throw 'y'
	const y = yield Promise.resolve('Y')
	return x + y
}))

test('test5', async(function *() {
	const x = yield Promise.resolve('x')
	try {
		const y = yield Promise.reject('y')
	} finally {
		console.log('test5 finally')
	}
}))

test('test6', async(function *() {
	const x = yield Promise.resolve('x')
	try {
		const y = yield Promise.reject('y')
	} finally {
		return x + 'Y'
	}
}))
