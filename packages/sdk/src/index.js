'use strict'

const endpoints = require('./endpoints');

function create () {
  const client = {
    pinFile: require('./pinFile')(),
    getFileHash: require('./getFileHash')(),
  }

  return client
}

module.exports = {
  endpoints, // list all DC endpoints
  create  // create a client
}
