'use strict'
const axios = require("axios")
const getFileHash = require("./getFileHash")
const FD = require('form-data')
// @ts-ignore
const crypto = require("public-encrypt")
// const base64 = require("js-base64")
const token = require('./token')
const Buffer = require('safe-buffer').Buffer
const utils = require('./utils')
// @ts-ignore
const deepCopy = require('deep-copy-all')

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').PinRes} PinRes
 * @typedef {import('./types').ImportCandidate} ImportCandidate
 * @typedef {import('axios').CancelTokenSource} CancelTokenSource
 * */

/**
 * @param {Options} opts
 * @param {ImportCandidate} file
 * @param {((p: number) => void)|undefined|null} onProgress
 * @param {CancelTokenSource|undefined|null} cancel
 * @return {Promise<PinRes>}
 */

async function pinFile(opts, file, onProgress, cancel) {
  const tag = 'pinFile:';
  const access_token = await token.getToken({
    zone: opts.zone,
    jwt: opts.jwt,
    force: true
  });
  const [one, two] = utils.teeFile(file)
  console.info(tag + "access_token:", access_token)
  const cid = await getFileHash(one);
  console.info(tag + "cid:", cid)
  // @ts-ignore
  const fullPrivateKey = `-----BEGIN PRIVATE KEY-----\n${opts.privateKey}\n-----END PRIVATE KEY-----`
  // @ts-ignore
  const encrypt_cid = crypto
    .privateEncrypt(fullPrivateKey, Buffer.from(cid))
    .toString("base64");
  console.info(tag + "encrypt_cid:", encrypt_cid)
  const form = new FD();
  const filename = two.name ? two.name : cid
  form.append("file", two, filename)
  form.append("cid", cid)
  form.append("secret", encrypt_cid)
  const formHeaders = form.getHeaders ? form.getHeaders() : {}
  console.info('formHeaders->', formHeaders)
  const cancelToken = cancel ? cancel.token : null

  // @ts-ignore
  return await axios.request({
    url: opts.url + '/pinning/pinFile',
    method: 'post',
    data: form,
    headers: {
      ...formHeaders,
      UserAccessToken: access_token
    },
    /** @param {any} p */
    onUploadProgress: (p) => {
      const percent = p.loaded / p.total
      if (onProgress) onProgress(percent)
    },
    cancelToken
  })
    // @ts-ignore
    .then((res) => res.data)
}


/** @param {Options} options*/
module.exports = function (options) {
  /**
   * @param {ImportCandidate} file
   * @param {((p: number) => void)|undefined|null} onProgress
   * @param {CancelTokenSource|undefined|null} cancel
   */
  async function wPinFile(file, onProgress = null, cancel = null) {
    return await pinFile(options, file, onProgress, cancel)
  }

  return wPinFile
}
