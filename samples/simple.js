import async from '../src'
import {asap, sleep, wait, par} from './util'

wait1sec(3)
	.then(v => par(next(v), prev(v)))
	.then(wait(1000))
	.then(([a, b]) => console.log('promise version:', a, b))

async(function *() {
	const v = yield wait1sec(3)
	const a = next(v), b = prev(v)
	yield sleep(1000)
	console.log('async/await version:', a, b)
})()

function wait1sec(x) { return wait(1000)(x) }
function next(x) { return x + 1 }
function prev(x) { return x - 1 }
