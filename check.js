'use strict'

const fs = require('fs')

function checkStream (stream, cb) {
  if (!stream.fd) {
    process.nextTick(() => cb(null, false))
    return
  }

  fs.fstat(stream.fd, (err, result) => {
    if (err) {
      return cb(err)
    }

    return cb(null, checkResult(result))
  })
}

function checkStreamSync (stream) {
  if (!stream.fd) {
    return false
  }

  const result = fs.fstatSync(stream.fd)

  return checkResult(result)
}

function checkResult (result) {
  const env = process.env.JOURNAL_STREAM
  if (!env) return false
  if (!result) return false

  const expected = `${result.dev}:${result.ino}`

  return env === expected
}

module.exports = {
  checkStream,
  checkStreamSync,
  checkResult
}
