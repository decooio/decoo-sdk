'use strict'

/**
 * @typedef {import('./types').Options} Options
 */

/**
 * @param {Options|string} [options]
 * @returns {Options}
 */
const normalizeOptions = (options = {}) => {
  let url
  /** @type {Options} */
  let opts = {}
  if (typeof options === 'string') {
    url = options
  } else {
    opts = options || {}
    url = opts.url
  }
  if (!opts.zone) opts.zone = 'global'
  return {
    ...opts,
    url
  }
}

/**
 * @param{string} str
 * @return{Uint8Array}
 * */
const strToUint8Array = (str) => {
  const arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  return new Uint8Array(arr)
}

/**
 * @param {Options} options
 * @returns {string}
 */
const getCloudUrl = (options) => {
  if (options.zone === 'beta')
    return "https://beta.api.decoo.io"
  if (options.zone === 'cn'){
    return "https://api.decoo-cloud.cn"
  }
  return "https://api.decoo.io"
}

module.exports = {
  normalizeOptions,
  strToUint8Array,
  getCloudUrl
}