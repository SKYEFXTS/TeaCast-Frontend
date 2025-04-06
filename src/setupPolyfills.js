// Global polyfills needed for tests
// These need to be defined before anything else is imported

// TextEncoder/TextDecoder polyfills from util
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Web API polyfills
const { Blob, File } = require('node:buffer');
const { fetch, Headers, Request, Response } = require('node-fetch');
const { URL, URLSearchParams } = require('node:url');
const { webcrypto } = require('node:crypto');

// Simple FormData polyfill
class FormDataPolyfill {
  constructor() {
    this.data = {};
  }
  append(key, value) {
    this.data[key] = value;
  }
  get(key) {
    return this.data[key];
  }
  getAll() {
    return this.data;
  }
}

// Assign all polyfills to global object
global.Blob = Blob;
global.File = File;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.fetch = fetch;
global.FormData = FormDataPolyfill;
global.URL = URL;
global.URLSearchParams = URLSearchParams;
global.crypto = webcrypto;

// console.log("Polyfills loaded: TextEncoder, TextDecoder, etc.");