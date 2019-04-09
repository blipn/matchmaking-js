const fs = require('fs');

export default (data) => {
  if (data.error) {
    fs.appendFile('matchmaking.log', `\n${new Date()} : ERROR : ${data.error}`, (err) => {
      if (err) throw err;
    });
  } else {
    fs.appendFile('matchmaking.log', `\n${new Date()} : INFO : ${data.info}`, (err) => {
      if (err) throw err;
    });
  }
};
