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
      this.cleanRoom(i);
    }
    return new Success(`Config set to : ${JSON.stringify(config)}`);
  },

  /**
   * matchmake a player and add it to a room
   * @param {string} user
   */
  // eslint-disable-next-line consistent-return
  matchmake(user) {
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
    // return false;
  },

  /**
   * matchmaking with callback
   * @param {callback} callback(bool)
   * @param {string} user
   */
  matchmaking(callback, user) {
    callback(this.matchmake(user));
  },

  /**
  * Put a player in a room
  * @param {number} roomNumber
  * @param {string} user
  * @returns {number} roomNumber OR False
  */
  goToRoom(roomNumber, user) {
    if (rooms[roomNumber].players.length >= roomSize || rooms[roomNumber].inGame) {
      return false; // Cannot join room
    }
    rooms[roomNumber].players.push(user);
    return roomNumber;
  },

  /**
  * display the requested room
  * @param {number} room
  * @returns {Object} room
  */
  getRoom(room) {
    return rooms[room];
  },

  /**
  * display all rooms
  * @returns {Array} rooms
  */
  getRooms() {
    return rooms;
  },

  /**
  * display the requested player's room
  * @param {string} player
  * @returns {object} player OR False
  */
  findPlayer(player) {
    return rooms.find(i => i.players.find(p => p === player) === player) || false;
  },

  /**
  * Clean a room (reset)
  * @param {string} room (id)
  * @returns {boolean} player
  */
  cleanRoom(room) {
    rooms[room] = {
      id: room,
      inGame: false,
      players: [],
    };
  },

  /**
  * Lock a room (set inGame to true)
  * @param {string} room
  * @returns {boolean} success
  */
  lockRoom(room) {
    if (!rooms[room].inGame) {
      rooms[room].inGame = true;
      return true;
    }
    return false;
  },

  /**
  * Kick a player
  * @param {string} player
  * @returns {boolean} success
  */
  kickPlayer(player) {
    let room = null;
    room = this.findPlayer(player).id;
    if (room !== null) {
      const index = rooms[room].players.indexOf(player);
      rooms[room].players.splice(index, 1);
      return true;
    }
    return false;
  },

};
