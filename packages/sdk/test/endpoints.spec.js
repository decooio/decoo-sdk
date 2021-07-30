/* eslint-env mocha */
'use strict'

const {expect} = require('aegir/utils/chai')
const listEndpoints = require('../src/listEndpoints')
const env = require('../../../.env')
describe('.listEndpoints', function () {
  this.timeout(60 * 1000)

  it('lists endpoints', async () => {
    const res = await listEndpoints({zone: "cn", jwt: env.jwt});
    console.info('endpoints::', res)
    expect(res).to.deep.include( { id: 1, name: '上海', apiHost: 'https://api-sh.decoo-cloud.cn' } )
  })
})
