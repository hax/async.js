'use strict'

var async = require('../dist')

var asyncSum = async(function *sum(a, b) {
	var valueA = yield a
	var valueB = yield b
	return valueA + valueB
})

var asyncResult = asyncSum(Promise.resolve(1), waitAndReturn(1000, 2))

console.time('async sum')
asyncResult.then(function (value) {
	console.assert(value === 3)
	console.timeEnd('async sum')
	console.log('result:', value)
})

function waitAndReturn(ms, value) {
	return new Promise(function (resolve) {
		setTimeout(function () { resolve(value) }, ms)
	})
}
