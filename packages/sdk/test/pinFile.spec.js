/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const sdk = require('../src/index')
const env = require('../../../.env')
const fs = require('fs')
const path = require('path')

describe('pinFile', function () {
  this.timeout(60 * 1000)
  console.info('env->', env)
  const client = sdk.create({
    jwt: env.jwt,
    privateKey: env.privateKey,
    zone: "cn",
    url: 'https://api-sh.decoo-cloud.cn'
  })
  it('test pinFile', async () => {
    const p = path.resolve('/Users/eericxu/work/decoo-sdk/packages/sdk/README.md')
    console.info('p::', p)
    const res = await client.pinFile(fs.createReadStream(p))
    console.info('res::', res);
    expect(res.PinHash).to.equal("QmYApSHprHFj9BNRW63SQmgsysJ4HvuuvsBtGkErr7pC1L")
  })
})
