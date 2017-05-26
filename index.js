const Assert = require('assert')

const Analytics = require('analytics-node')

const { name, version } = require('./package.json')
const { onRequest, onPreResponse } = require('./lib')

const isFunction = (arg) => typeof arg === 'function'

exports.register = (server, options, next) => {
  let { segmentKey, segmentOptions = {}, getToken = false, skip = false } = options

  Assert(segmentKey, '`segmentKey` is required')
  if (getToken) Assert(isFunction(getToken), '`getToken` must be a function')
  else getToken = (request) => request.id

  if (skip) Assert(isFunction(skip), '`skip` must be a function')

  const analytics = new Analytics(segmentKey, segmentOptions)

  server.ext('onRequest', onRequest({ analytics, getToken, skip }))
  server.ext('onPreResponse', onPreResponse({ analytics, getToken, skip }))

  next()
}

exports.register.attributes = { pkg: { name, version } }
