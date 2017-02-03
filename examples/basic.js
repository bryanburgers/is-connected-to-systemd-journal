'use strict'

const fs = require('fs')
const isConnected = require('../index')

const stat = fs.fstatSync(process.stdout.fd)
const stdout = `${stat.dev}:${stat.ino}`

console.log(`JOURNAL_STREAM = ${process.env.JOURNAL_STREAM}`)
console.log(`stdout         = ${stdout}`)
console.log(`isConnected    = ${isConnected.sync()}`)
