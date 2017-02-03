Determine if the current process is connected via stdout or stderr to the
systemd journal.

[![Build Status](https://travis-ci.org/bryanburgers/is-connected-to-systemd-journal.svg?branch=master)](https://travis-ci.org/bryanburgers/is-connected-to-systemd-journal)

## NOTE ABOUT UBUNTU 16.04

This module checks the environment variable [`JOURNAL_STREAM`][JOURNAL_STREAM]
which was [introduced][introduced] in systemd v231. As of this writing, [Ubuntu
16.04 is using systemd v229][ubuntu1604], which means that this module will
always return `false` in Ubuntu 16.04.

It is suggested that, in Ubuntu 16.04 and other systems with systemd < 231, set
an environment variable for your process and use that to determine whether to
log to systemd's journal or to stdout.

```
if (isConnected.sync() || process.env.VARIABLE_I_SET_TO_TRIGGER_JOURNAL) {
  // Log to the journal
}
```

## Installation

```
npm install --save is-connected-to-systemd-journal
```


## Usage (synchronous)

```
const isConnected = require('is-connected-to-systemd-journal')

let log = null;
if (isConnected.sync()) {
  // set up logging to require('systemd-journald') or other
}
else {
  // set up logging to some other sink (like console.out)
}

isConnected.stdoutSync() // is stdout connected to the journal
isConnected.stderrSync() // is stdout connected to the journal
isConnected.sync() // same as isConnected.stdoutSync
```


## Usage (async)

```
const isConnected = require('is-connected-to-systemd-journal')

isConnected((err, connected) => {
  let log = null;
  if (connected) {
    // set up logging to require('systemd-journald') or other
  }
  else {
    // set up logging to some other sink (like console.out)
  }
})

isConnected.stdout(cb) // is stdout connected to the journal
isConnected.stderr(cb) // is stdout connected to the journal
isConnected(cb) // same as isConnected.stdout
```

[JOURNAL_STREAM]: http://www.dsm.fordham.edu/cgi-bin/man-cgi.pl?topic=systemd.exec
[introduced]: https://github.com/systemd/systemd/blob/v231/NEWS#L52
[ubuntu1604]: https://launchpad.net/ubuntu/xenial/+source/systemd
