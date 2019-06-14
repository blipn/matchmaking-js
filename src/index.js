/* eslint-disable no-plusplus */
// import Error from './interface/error';
import Success from './interface/success';
import { errorLogs, infoLogs } from './interface/logs';

let roomSize = 4;
const rooms = [];
let maxRooms = 100;

Success('MATCHMAKING-JS IMPORTED');

export default {
  /**
  * Set the module configuration
  * @param {object} config
  * @param {number} config.roomSize
  * @param {number} config.maxRooms
  * @param {boolean} config.errorLogs
  * @param {boolean} config.infoLogs
  * @returns {Success}
  */
  setConfig(config) {
    roomSize = config.roomSize || roomSize;
    maxRooms = config.maxRooms || maxRooms;
    if (typeof config.errorLogs !== 'undefined') errorLogs(config.errorLogs);
    if (typeof config.infoLogs !== 'undefined') infoLogs(config.infoLogs);
    for (let i = 0; i < maxRooms; i++) {
      rooms[i] = {
        name: i,
        inGame: false,
        players: [],
      };
    }
    return new Success(`Config set to : ${JSON.stringify(config)}`);
  },

  matchmaker(user) {
    let found = false;
    for (let i = 0; i < maxRooms; i++) {
      // Va en priorité dans une room non vide et non en jeu
      if (!rooms[i].inGame && rooms[i].players.length > 0 && rooms[i].players.length < roomSize) {
        found = true;
        return this.goToRoom(i, user);
      }
    } if (!found) {
      for (let i = 0; i < maxRooms; i++) {
        // Sinon va dans une room non en jeu
        if (!rooms[i].inGame && rooms[i].players.length < roomSize) {
          found = true;
          return this.goToRoom(i, user);
        }
      }
    } if (!found) {
      return false; // NO room available
    }
    return false;
  },

  matchmaking(callback, user) {
    callback(this.matchmaker(user));
  },

  goToRoom(roomNumber, user) {
    if (rooms[roomNumber].players.length >= roomSize || rooms[roomNumber].inGame) {
      return false; // Cannot join room
    }
    rooms[roomNumber].players.push(user);
    return roomNumber;
  },

  /**
  * See the requested player room
  * or all rooms requesting null
  * @param {string} playername
  * @returns {Array} rooms
  */
  getRooms(playername) {
    if (playername === null) {
      return rooms;
    }
    return rooms.filter(i => i.id === playername);
  },

  /**
  * Find a player room
  * @param {string} id (playername)
  * @returns {object} player
  */
  findPlayer(id) {
    return rooms.find(i => i.players.find(p => p === id) === id) || false;
  },

  /**
  * Kick a player
  * @param {string} id (playername)
  * @returns {boolean} success
  */
  kickPlayer(id) {
    let room = null;
    room = this.findPlayer(id).name;
    if (room !== null) {
      const index = rooms[room].players.indexOf(id);
      rooms[room].players.splice(index, 1);
      return true;
    }
    return false;
  },

};
