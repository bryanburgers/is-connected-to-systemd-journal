'use strict'

/* global describe, it, before */

const assert = require('chai').assert
const check = require('../check')
const fs = require('fs')

describe('is-connected-to-systemd-journal', function () {
  let expectedJournalEnv = null
  let unexpectedJournalEnv = null
  before(function () {
    const stdoutStat = fs.fstatSync(process.stdout.fd)
    expectedJournalEnv = `${stdoutStat.dev}:${stdoutStat.ino}`
    unexpectedJournalEnv = `${stdoutStat.dev + 1}:${stdoutStat.ino}`
  })

  describe('checkResult', function () {
    it('returns true when a stat matches', function () {
      process.env.JOURNAL_STREAM = '8:31704'
      const stat = {
        dev: 8,
        mode: 49663,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 31704,
        size: 0,
        blocks: 0 }

      const result = check.checkResult(stat)

      assert.isTrue(result)
    })

    it('returns false when a stat does not match', function () {
      process.env.JOURNAL_STREAM = '8:1'
      const stat = {
        dev: 8,
        mode: 49663,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 31704,
        size: 0,
        blocks: 0 }

      const result = check.checkResult(stat)

      assert.isFalse(result)
    })

    it('returns false when the stat does not have the expected values', function () {
      process.env.JOURNAL_STREAM = '8:1'
      const stat = {}

      const result = check.checkResult(stat)

      assert.isFalse(result)
    })

    it('returns false when the stat is null', function () {
      process.env.JOURNAL_STREAM = '8:1'
      const stat = null

      const result = check.checkResult(stat)

      assert.isFalse(result)
    })

    it('returns false when JOURNAL_STREAM is not in the environment', function () {
      delete process.env.JOURNAL_STREAM
      const stat = {
        dev: 8,
        mode: 49663,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 31704,
        size: 0,
        blocks: 0 }

      const result = check.checkResult(stat)

      assert.isFalse(result)
    })
  })

  describe('checkStream', function () {
    it('returns true when a stream matches', function (done) {
      process.env.JOURNAL_STREAM = expectedJournalEnv

      check.checkStream(process.stdout, (err, result) => {
        if (err) return done(err)

        assert.isTrue(result)
        done()
      })
    })

    it('returns false when a stream does not match', function (done) {
      process.env.JOURNAL_STREAM = unexpectedJournalEnv

      check.checkStream(process.stdout, (err, result) => {
        if (err) return done(err)

        assert.isFalse(result)
        done()
      })
    })

    it('returns false when JOURNAL_STREAM is not in the environment', function (done) {
      delete process.env.JOURNAL_STREAM

      check.checkStream(process.stdout, (err, result) => {
        if (err) return done(err)

        assert.isFalse(result)
        done()
      })
    })
  })

  describe('checkStreamSync', function () {
    it('returns true when a stream matches', function () {
      process.env.JOURNAL_STREAM = expectedJournalEnv

      const result = check.checkStreamSync(process.stdout)

      assert.isTrue(result)
    })

    it('returns false when a stream does not match', function () {
      process.env.JOURNAL_STREAM = unexpectedJournalEnv

      const result = check.checkStreamSync(process.stdout)

      assert.isFalse(result)
    })

    it('returns false when JOURNAL_STREAM is not in the environment', function () {
      delete process.env.JOURNAL_STREAM

      const result = check.checkStreamSync(process.stdout)

      assert.isFalse(result)
    })
  })
})
