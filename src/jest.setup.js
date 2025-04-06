/* global globalThis */

// Polyfill for TextEncoder/TextDecoder
if (typeof globalThis.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('node:util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

// Polyfill for Request/Response/Headers
if (typeof globalThis.Request === 'undefined') {
  const { Request, Response, Headers, fetch } = require('node-fetch');
  globalThis.Request = Request;
  globalThis.Response = Response;
  globalThis.Headers = Headers;
  globalThis.fetch = fetch;
}

// Polyfill for URL
if (typeof globalThis.URL === 'undefined') {
  const { URL } = require('node:url');
  globalThis.URL = URL;
}

// Polyfill for crypto
if (!globalThis.crypto) {
  const { webcrypto } = require('node:crypto');
  globalThis.crypto = webcrypto;
}