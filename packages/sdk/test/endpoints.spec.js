/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const listEndpoints = require('./listEndpoints')

describe('.listEndpoints', function () {
  this.timeout(60 * 1000)

  it('lists endpoints', async () => {
    const res = await listEndpoints();

    expect(res).to.include('https://api-sh.decoo.io')
  })
})
