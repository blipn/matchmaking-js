const fs = require('fs');

let errors = true;
let infos = true;

const log = (data) => {
  if (data.error && errors) {
    fs.appendFile('matchmaking.log', `\n${new Date()} : ERROR : ${data.error}`, (err) => {
      if (err) throw err;
    });
  } else if (infos) {
    fs.appendFile('matchmaking.log', `\n${new Date()} : INFO : ${data.info}`, (err) => {
      if (err) throw err;
    });
  }
};

const errorLogs = (bool) => {
  errors = bool;
};
const infoLogs = (bool) => {
  infos = bool;
};

export default log;
export { errorLogs, infoLogs };
