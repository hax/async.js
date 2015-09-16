# async.js -- async function wrapper


## Note

This project is mainly for demo/learning/testing. Normally you will not
need to use it in production, because ES7 async/await has been available
in [Babel](http://babeljs.io/) and other transpilers. I recommend you to
just use them. And eventually JavaScript engines in the browsers and
node.js/io.js will also support async/await natively.

The only exception is if you can not use transpilers for any reason or
your transpilers have not supported async/await feature, you could just
use it!

There are also many other libraries which provide the same functionality
such as [co](https://github.com/tj/co). The advantage of this project is,
it's very simple, only [30 lines code](https://github.com/hax/async.js/blob/master/src/index.js) :)


## Introduction

`async` convert a generator to an async function, which returns a promise.

### Sample

```js
var asyncSum = async(function *sum(a, b) {
	return (yield a) + (yield b)
})

var asyncResult = asyncSum(Promise.resolve(1), waitAndReturn(1000, 2))

asyncResult.then(v => console.assert(v === 3))

function waitAndReturn(ms, value) {
	return new Promise(resolve => setTimeout(() => resolve(value), ms))
}
```

### TODO

  - Add commented version
