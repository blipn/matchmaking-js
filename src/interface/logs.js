const fs = require('fs');

export default (data) => {
  fs.appendFile('matchmaking.log', `\n${new Date()} : ${JSON.stringify(data)}`, (err) => {
    if (err) throw err;
  });
};
