const getProps = ({ payload, method }) => {
  if (['post', 'put'].some((reqMethod) => method === reqMethod)) {
    if (payload) return Object.keys(payload)
  } else return []
}

const createIdentifyData = (request, token) => Object.assign({}, {
  userId: token,
  timestamp: new Date(),
  traits: {
    hostname: request.info.hostname,
    remoteAddress: request.info.remoteAddress
  }
})

const createTrackData = (request, token, lifecycle) => Object.assign({}, {
  userId: token,
  timestamp: new Date(),
  event: `${request.method.toUpperCase()} ${request.path}`,
  properties: { lifecycle, body: getProps(request) }
})

exports.onRequest = ({ analytics, getToken, skip }) => (request, reply) => {
  const token = getToken(request)

  if (skip && skip(request)) return reply.continue()

  const identifyData = createIdentifyData(request, token)
  const trackData = createTrackData(request, token, 'onRequest')

  analytics.identify(identifyData)
  analytics.track(trackData)
  return reply.continue()
}

exports.onPreResponse = ({ analytics, getToken, skip }) => (request, reply) => {
  const token = getToken(request)

  if (skip && skip(request)) return reply.continue()

  const trackData = createTrackData(request, token, 'onPreResponse')
  trackData.properties.statusCode = request.response.statusCode

  analytics.track(trackData)
  return reply.continue()
}
