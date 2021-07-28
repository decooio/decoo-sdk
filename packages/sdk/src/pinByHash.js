'use strict'
const axios = require("axios")
// @ts-ignore
const crypto = require("public-encrypt")
// const base64 = require("js-base64")
const token = require('./token')

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').PinHashRes} PinHashRes
 * */

/**
 * @param {Options} opts
 * @param {string} cid
 * @return {Promise<PinHashRes>}
 */

async function pinByHash(opts, cid) {
  const tag = 'pinByHash:';
  const access_token = await token.getToken({
    zone: opts.zone,
    jwt: opts.jwt,
    force: true
  });
  console.info(tag + "cid:", cid)
  // @ts-ignore
  const fullPrivateKey = `-----BEGIN PRIVATE KEY-----${opts.privateKey}-----END PRIVATE KEY-----`
  // @ts-ignore
  const encrypt_cid = crypto
    .privateEncrypt(fullPrivateKey, new Buffer(cid))
    .toString("base64");
  console.info(tag + "encrypt_cid:", encrypt_cid)
  const body = {
    hashToPin: cid,
    secret: encrypt_cid
  }
  // @ts-ignore
  return await axios.request({
    url: opts.url + '/pinning/pinByHash',
    method: 'post',
    data: body,
    headers: {
      UserAccessToken: access_token
    },
  })
    // @ts-ignore
    .then((res) => res.data)
}


/** @param {Options} options*/
module.exports = function (options) {
  /**
   * @param {string} cid
   */
  async function wPinByHash(cid) {
    return await pinByHash(options, cid)
  }

  return wPinByHash
}
