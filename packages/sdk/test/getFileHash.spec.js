/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const getFileHash = require('../src/getFileHash')
const fs = require('fs')
const path = require('path')

describe('getFileHash', function () {
  this.timeout(60 * 1000)

  it('test getFileHash', async () => {
    const p = path.resolve('/Users/eericxu/work/decoo-sdk/packages/sdk/README.md')
    console.info('p::', p)
    const res = await getFileHash(fs.createReadStream(p))
    expect(res).to.equal('QmYApSHprHFj9BNRW63SQmgsysJ4HvuuvsBtGkErr7pC1L')
  })
})
