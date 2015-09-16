'use strict'

var async = require('../dist')

var asyncSum = async(function *sum(a, b) {
	var valueA = yield a
	var valueB = yield b
	return valueA + valueB
})

var asyncResult = asyncSum(Promise.resolve(1), waitAndReturn(1000, 2))

console.time('async sum')
asyncResult.then(value => {
	console.timeEnd('async sum')
	console.log('result:', value)
	console.assert(value === 3)
})

function waitAndReturn(ms, value) {
	return new Promise(resolve => setTimeout(() => resolve(value), ms))
}
