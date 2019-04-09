import Error from './interface/error';
import Success from './interface/success';
import { errorLogs, infoLogs } from './interface/logs';

const uuid = require('uuid/v4');

let roomSize = 4;
let defaultQueue = '_';
const matchmakingQueues = [];
const rooms = [];

Success('MATCHMAKING-JS IMPORTED');

export default {
  /**
  * Set the module configuration
  * @param {object} config
  * @param {number} config.roomSize
  * @param {string} config.defaultQueue
  * @param {boolean} config.errorLogs
  * @param {boolean} config.infoLogs
  * @returns {Success}
  */
  setConfig(config) {
    roomSize = config.roomSize || roomSize;
    defaultQueue = config.defaultQueue || defaultQueue;
    if (typeof config.errorLogs !== 'undefined') errorLogs(config.errorLogs);
    if (typeof config.infoLogs !== 'undefined') infoLogs(config.infoLogs);
    return new Success(`Config set to : ${JSON.stringify(config)}`);
  },

  /**
   * Add a user to the matchmaking queue
   * @param {Object} user
   * @param {string} user.id (playername)
   * @param {number} user.elo (score)
   * @param {string} queue (queue name)
   * @returns {Success|Error}
   */
  addPlayer(user, queue = defaultQueue) {
    // Set Player object
    const player = { queue };
    if (!user) {
      return new Error('Missing user object');
    }
    if (typeof user === 'string' && user !== '') {
      player.id = user;
    } else if (!user.id || typeof user.id !== 'string' || user.id === '') {
      return new Error('Missing id');
    } else {
      player.id = user.id;
    }
    if (user.elo && typeof user.elo === 'number') {
      player.elo = user.elo;
    }

    // Abort if player already in matchmaking
    if (this.getPlayer(player.id)) {
      return new Error('Player already in queue');
    }

    // import player in matchmaking queue
    matchmakingQueues.push(player);

    // Check if a room is available
    this.check();

    // notify the player
    return new Success(`Player ${player.id} added to queue`);
  },

  /**
  * See the requested matchmaking queue
  * or all matchmaking queues by requesting null
  * @param {string} queue
  * @returns {object} matchmaking queue
  */
  status(queue = defaultQueue) {
    if (queue === null) {
      return matchmakingQueues;
    }
    return matchmakingQueues.filter(i => i.queue === queue);
  },

  /**
  * See the current matchmaking queue
  * @param {string} id (playername)
  * @returns {object} player
  */
  getPlayer(id) {
    return matchmakingQueues.find(i => i.id === id) || false;
  },

  /**
  * kick a player from matchmaking queue
  * @param {string} id (playername)
  * @returns {Success}
  */
  kickPlayer(id) {
    const player = this.getPlayer(id);
    const index = matchmakingQueues.indexOf(player);

    if (index !== -1) {
      matchmakingQueues.splice(index, 1);
    }

    return new Success(`Player ${JSON.stringify(player)} removed from matchmaking queue`);
  },

  /**
  * check if a new matchmaking is allowed,
  * Create rooms and shift players into
  * @param {string} queue
  * @returns {Success|Error}
  */
  check(queue = defaultQueue) {
    if (this.status(queue).length >= roomSize) {
      const players = [];
      for (let index = 0; index < roomSize; index += 1) {
        players.push(this.status(queue).shift());
      }
      return this.createRoom();
    }
    return new Error('Not enough players');
  },

  /**
  * Create room
  * @returns {Success} Success and room object in 'data'
  */
  createRoom() {
    const id = uuid();
    const room = {
      id,
      players: []
    };
    rooms.push(room);
    return new Success(`Room created : ${JSON.stringify(room)}`, room);
  }
};
