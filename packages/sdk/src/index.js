'use strict'

const listEndpoints = require('./listEndpoints');

function client(options = {}) {
  const client = {
    pinFile: require('./pinFile')
  }

  return client
}

const utils = {
  getFileHash: require('./getFileHash')
}

module.exports = {
  listEndpoints,
  client,
  utils
}
