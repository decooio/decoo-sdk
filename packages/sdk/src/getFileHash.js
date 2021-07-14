'use strict'

const IPFS = require('ipfs-core');

/** @type {import('ipfs-core').IPFS} */
let ipfs;

/**
 * @param {any} fileContent
 */
 // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#filecontent
module.exports = async(fileContent) => {
  if (!ipfs) {
    ipfs = await IPFS.create();
  }
  const { cid } = await ipfs.add(fileContent, { onlyHash: true, pin: false, cidVersion: 0 });
  return cid.toString();
}
