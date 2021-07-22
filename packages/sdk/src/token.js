'use strict'
const axios = require("axios");
const {getCloudUrl} = require("./utils")
/** @typedef {import("./types").Options} Options*/

/** @type {string|null} lastToken */
let lastToken = null
let lastTokenTime = new Date()

/**
 * getToken auto refresh for 30 minutes
 * @param {Options} options
 * @return {Promise<string>}
 * */
async function getToken(options) {
  const ctime = new Date().getTime();
  if (lastToken != null && ctime - lastTokenTime.getTime() < 1000 * 60 * 20) {
    return lastToken
  }
  // @ts-ignore
  const data = await axios.request({
    url: getCloudUrl(options) + '/oauth/accessToken',
    method: "GET",
    headers: {
      Authorization: "Bearer " + options.jwt
    }
  })
    // @ts-ignore
    .then((res) => res.data)
  lastToken = data.Data
  lastTokenTime = new Date()
  return lastToken ?? ''
}

function clearToken() {
  lastToken = null
}

module.exports = {
  getToken,
  clearToken
}
