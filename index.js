'use strict'

// const isConnectedToSystemdJournal = require('is-connected-to-systemd-journal');
// isConnectedToSystemdJournal((err, r) => {}); // same as isConnectedToSystemdJournal.stdout(callback);
// isConnectedToSystemdJournal.stdout((err, r) => {});
// isConnectedToSystemdJournal.stderr((err, r) => {});
// isConnectedToSystemdJournal.sync(); // same as isConnectedToSystemdJournal.stdoutSync()
// isConnectedToSystemdJournal.stdoutSync();
// isConnectedToSystemdJournal.stderrSync();

const check = require('./check')

function stdout (cb) {
  return check.checkStream(process.stdout, cb)
}

function stderr (cb) {
  return check.checkStream(process.stderr, cb)
}

function stdoutSync () {
  return check.checkStreamSync(process.stdout)
}

function stderrSync () {
  return check.checkStreamSync(process.stderr)
}

const def = stdout

module.exports = def
def.stdout = stdout
def.stderr = stderr
def.sync = stdoutSync
def.stdoutSync = stdoutSync
def.stderrSync = stderrSync
