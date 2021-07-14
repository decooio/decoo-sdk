'use strict'
const axios = require("axios");
const utils = require('./utils');

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').PinRes} PinRes
 * @typedef {import('./types').Endpoint} Endpoint
 *
 * */

/**
 * @param {Options} options
 * @return {Promise<Endpoint[]>}
 */
async function listEndpoints(options) {
  // @ts-ignore
  const list = await axios.request({
    url: utils.getCloudUrl(options) + '/dc/list',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + options.jwt
    }
  })
    // @ts-ignore
    .then((res) => res.data)
    // @ts-ignore
    .catch(e => [
      {
        id: 1,
        dcName: 'HK-1',
        httpHost: "https://beta.api-dc.decoo.io",
        ipfsApiHost: "https://beta.ipfs-node-dc.decoo.io"
      }
    ])
  return list;
}

/** @param {Options} options*/
module.exports = listEndpoints

