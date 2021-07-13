'use strict'

module.exports = () => {
  /**
   * @param {string} filePath
   */
  async function getFileHash (filePath) {
    return `${filePath}_TEST_CID`;
  }
  return getFileHash
}
