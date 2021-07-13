const chai = require('aegir/utils/chai')
const pinning = require('../../src/api/pinning')

describe("pinning", function () {
  it('pinFile', function () {
    const res = pinning.pinFile('/');
    chai.assert.equal(res, '', "pinFile success")
  })
})

