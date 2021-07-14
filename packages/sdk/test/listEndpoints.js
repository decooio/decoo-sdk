/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const endpoints = require('./endpoints')

describe('.endpoints', function () {
  this.timeout(60 * 1000)

  it('lists endpoints', async () => {
    const res = await endpoints();

    expect(res).to.include('https://api-sh.decoo.io')
  })
})
