# hapi-segment-analytics

> Hapi plugin to track request and pre-response data to Segment.IO

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

`$ npm install hapi-segment-analytics`

## Segment.IO Configuration

To get started with Segment, check out their [documentation](https://segment.com/docs/sources/server/node/#configuration)

## Usage

```
server.register({
  register: require('hapi-segment-analytics'),
  options: {
    segmentKey: 'secret',
    segmentOptions: {} // set flush props
    getToken: (request) => request.id, // custom logic
    skip: (request) => false // should track?
  }
})
```

`getToken` is a custom function used to grab some type of identifier to the end user.
For example, this may be an auth token.

```js
// Get auth token from request headers
// Example headers
// request.headers = { authorization: 'Token 123' }
const getToken = (request) => request.headers['authorization'].split(' ')[1]
```

`skip` is a custom function that skips tracking a `onRequest` and `onPreResponse` if
conditions are met.

```js
// Skip tracking requests if the admin token is present
const skip = (request) => request.headers['authorization'].split(' ')[1] === 'adminToken'
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)

[segmentDocs]: https://segment.com/docs/sources/server/node/#configuration
