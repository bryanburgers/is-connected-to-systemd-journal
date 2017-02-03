'use strict'

const childProcess = require('child_process')
const path = require('path')

const options = {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc']
}

console.log('Current process:')
require('./basic.js')
console.log('Spawned process:')

const process = childProcess.fork(path.resolve(__dirname, './basic.js'), [], options)

process.stdout.on('data', data => {
  console.log(data.toString('utf8').trim())
})

process.stderr.on('data', data => {
  console.log(data.toString('utf8').trim())
})
