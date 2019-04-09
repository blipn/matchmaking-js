import Error from './interface/error';
import Success from './interface/success';

const uuid = require('uuid/v4');

const roomSize = 4;
const defaultQueue = '_';
const matchmakingQueue = [];
const rooms = [];

export default {
  /**
   * Add a user to the matchmaking queue
   * @param {Object} user
   * @param {string} user.id (playername)
   * @param {number} user.elo (score)
   * @param {string} queue (queue name)
   */
  addPlayer(user, queue = defaultQueue) {
    // Set Player object
    const player = { queue };
    if (!user) {
      return new Error('Missing user object', 1);
    }
    if (typeof user === 'string' && user !== '') {
      player.id = user;
    } else if (!user.id || typeof user.id !== 'string' || user.id === '') {
      return new Error('Missing id', 2);
    } else {
      player.id = user.id;
    }
    if (user.elo && typeof user.elo === 'number') {
      player.elo = user.elo;
    }

    // Abort if player already in matchmaking
    if (this.getPlayer(player.id)) {
      return new Error('Player already in queue', 4);
    }

    // import player in matchmaking queue
    matchmakingQueue.push(player);

    // Check if a room is available
    this.check();

    // notify the player
    return new Success(`Player ${player.id} added to queue`);
  },
  /**
  * See the current matchmaking queue
  * @param {string} queue
  */
  status(queue = defaultQueue) {
    if (queue === null) {
      return matchmakingQueue;
    }
    return matchmakingQueue.filter(i => i.queue === queue);
  },
  /**
  * See the current matchmaking queue
  * @param {string} id (playername)
  */
  getPlayer(id) {
    return matchmakingQueue.find(i => i.id === id);
  },
  /**
  * check if a new matchmaking is alawed
  * @param {string} queue
  */
  check(queue = defaultQueue) {
    if (this.status(queue).length >= roomSize) {
      const players = [];
      for (let index = 0; index < roomSize; index += 1) {
        players.push(this.status(queue).shift());
      }
      const room = {
        id: uuid(),
        players
      };
      rooms.push(room);
      return new Success(`Room created : ${JSON.stringify(room)}`);
    }
    return new Error('Not enough players', 3);
  }
};
