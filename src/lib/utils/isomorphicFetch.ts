const fetch = global.fetch || (await import('node-fetch').then((module) => module.default))

export default fetch
