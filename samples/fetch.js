import nodeFetch from 'node-fetch'
import {parse} from 'url'
import {resolve} from 'path'

export default function fetch(url, {method, headers, body} = {}) {
	const urlObj = parse(url)
	if (urlObj.protocol) return nodeFetch(...arguments)

	const filename = resolve(process.cwd(), urlObj.path)

	return getFileContent(filename)
		.then(content => new Response(content, { status: 200 }))
		.catch(error => {
			let status
			switch (error.code) {
				case 'ENOENT': status = 404; break
				default: status = 400
			}
			return new Response('Error', { status, statusText: error.message })
		})
}


import {readFile} from 'fs'

function getFileContent(filename) {
	return new Promise((resolve, reject) => {
		readFile(filename, (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})
}


export class Response {
	constructor(body, {status = 200, statusText = 'OK', headers} = {}) {
		this._body = body
		this._status = status
		this._statusText = statusText
		this._headers = headers
	}
	get status() {
		return this._status
	}
	get ok() {
		return this.status >= 200 && this.status < 300
	}
	get statusText() {
		return this._statusText
	}
	get headers() {
		return this._headers
	}
	text() {
		return String(this._body)
	}
	arrayBuffer() {
		return new ArrayBuffer(this._body)
	}
	json() {
		return this._body
	}
}
