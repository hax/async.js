import async from '../src'

import {join} from 'path'
import fetch from './fetch'
import {asap, sleep} from './util'

const fetchAndConcat = async(function *(urls) {
	console.log('start...')
	yield asap()
	console.log('wait a second...')
	yield sleep(1000)
	console.log('request...')

	const fetchFiles = Promise.all(urls.map(url => join(__dirname, url)).map(fetch))

	const sources = yield Promise.race([
		fetchFiles,
		sleep(3000).then(() => { throw new Error('Timeout!') }),
	])

	const src = sources.map(res => res.text()).join('\n;;;;\n\n')
	return src
})

fetchAndConcat([
	'./fetch.js',
	'./util.js',
	'./concat.js',
])
.then(v => console.log('result:', v))
.catch(e => console.error(e.stack || e))
