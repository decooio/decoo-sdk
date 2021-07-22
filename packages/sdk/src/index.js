'use strict'

const listEndpoints = require('./listEndpoints');
const {normalizeOptions} = require('./utils');

/** @typedef {import('./types').Options} Options */

/**
 * @param {Options|string} options
 * @return {Client}
 * */
function create(options = {}) {
  return new Client(normalizeOptions(options))
}

class Client {
  /** @param {Options} options*/
  constructor(options) {
    this.options = options
    require('./token').clearToken()
    this.pinFile = require('./pinFile')(options)
    // this.pinByHash = require('./pinByHash')(options)
  }
}

const utils = {
  getFileHash: require('./getFileHash')
}

module.exports = {
  listEndpoints,
  create,
  utils,
  Client,
}
