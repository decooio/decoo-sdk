/**
 * @param {any} file
 */
const teeFile = (file) => {
  if (typeof file === 'string' || file instanceof String) {
    //@ts-ignore
    const blob = new Blob([file],{type:"text/plain;charset=utf-8"})
    return [blob, blob]
  }

  return [file, file]
}

module.exports = teeFile
