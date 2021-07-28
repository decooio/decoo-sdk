'use strict'
const axios = require("axios");
const utils = require('./utils');

/**
 * @typedef {import('./types').CloudOptions} CloudOptions
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').Endpoint} Endpoint
 * */

/**
 * @param {CloudOptions|Options} options
 * @return {Promise<Endpoint[]>}
 */
async function listEndpoints(options) {
  // @ts-ignore
  const list = await axios.request({
    url: utils.getCloudUrl(options) + '/endpoint/list',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + options.jwt
    }
  })
    // @ts-ignore
    .then((res) => res.data)
  return list;
}

module.exports = listEndpoints

