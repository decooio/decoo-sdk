'use strict'
const axios = require("axios")
const getFileHash = require("./getFileHash")
// @ts-ignore
const crypto = require("public-encrypt")
// const base64 = require("js-base64")
const token = require('./token')

/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').PinRes} PinRes
 * @typedef {import('axios').CancelTokenSource} CancelTokenSource
 * */

/**
 * @param {Options} opts
 * @param {File} file
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
  console.info(tag + "access_token:", access_token)
  const fileHash = await getFileHash(file);
  console.info(tag + "cid:", fileHash)
  // @ts-ignore
  const fullPrivateKey = `-----BEGIN PRIVATE KEY-----${opts.privateKey}-----END PRIVATE KEY-----`
  // @ts-ignore
  const encrypt_cid = crypto
    .privateEncrypt(fullPrivateKey, new Buffer(fileHash))
    .toString("base64");
  console.info(tag + "encrypt_cid:", encrypt_cid)

  const form = new FormData();
  form.append("file", file, file.name)
  form.append("cid", fileHash)
  form.append("secret", encrypt_cid)
  const cancelToken = cancel ? cancel.token : null
  // @ts-ignore
  return await axios.request({
    url: opts.url + '/pinning/pinFile',
    method: 'post',
    data: form,
    headers: {
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
   * @param {File} file
   * @param {((p: number) => void)|undefined|null} onProgress
   * @param {CancelTokenSource|undefined|null} cancel
   */
  async function wPinFile(file, onProgress = null, cancel = null) {
    return await pinFile(options, file, onProgress, cancel)
  }

  return wPinFile
}
