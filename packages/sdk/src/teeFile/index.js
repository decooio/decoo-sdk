/**
 * @param {any} file
 */
const teeFile = (file) => {
  if (file.path && file.pipe && typeof file.pipe === 'function') {
    //@ts-ignore
    return [file, require('fs').createReadStream(file.path)]
  }
  if (typeof file === 'string' || file instanceof String) {
    //@ts-ignore
    const buf = Buffer.from(file, 'utf-8')
    return [buf, buf]
  }
  return [file, file]
}
module.exports = teeFile
