# matchmaking-js

**A simple matchmaking node module**

[![Build Status](https://travis-ci.org/blipn/matchmaking-js.svg?branch=master)](https://travis-ci.org/blipn/matchmaking-js) 
[![dependencies Status](https://david-dm.org/blipn/matchmaking-js/status.svg)](https://david-dm.org/blipn/matchmaking-js) 
[![devDependencies Status](https://david-dm.org/blipn/matchmaking-js/dev-status.svg)](https://david-dm.org/blipn/matchmaking-js?type=dev) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Installation

```bash
$ npm install --save matchmaking-js
```
*NOT AVAILABLE YET ON NPM*

```js
var mmjs = require('matchmaking-js')
mmjs.setConfig({
      roomSize: 6, // default size for a room
      defaultQueue: '*', // default queue id
      errorLogs: true, // if you want error logs in a matchmaking.log file
      infoLogs: true // if you want info logs in a matchmaking.log file
    })
```

# Features
```js
// Add a user player1 with elo 500 to the matchmaking queue
mmjs.addPlayer({ id: 'player1', elo: 500 }) 
// Add a user player2 to the matchmaking queue
mmjs.addPlayer({ id: 'player2'})
// Add a user player3 to the matchmaking queue
mmjs.addPlayer('player3');

// Get the player1
var player1 = mmjs.getPlayer('player1')
player1 : { queue: '*', id: 'player1', elo: 500 }

// Kick the player1 from matchmaking
mmjs.kickPlayer('player1')

// Get the default matchmaking queue
mmjs.status()
// Get the complete matchmaking array 
mmjs.status(null)
// Get the requested matchmaking queue
mmjs.status('myQueue')
```

# Links
✨ https://github.com/flexdinesh/npm-module-boilerplate

# License
MIT © blipn
