import Error from './interface/error';
import Success from './interface/success';

const matchmakingQueue = [];

export default {
  /**
   * @param {Object} user
   * @param {string} user.username
   * @param {number} user.elo
   */
  addPlayer(user) {
    // Set Player object
    const player = {};
    if (!user) {
      return new Error('Missing user object', 1);
    }
    if (!user.username || typeof user.username !== 'string' || user.username === '') {
      return new Error('Missing username', 2);
    }
    player.username = user.username;
    if (!user.elo || typeof user.elo !== 'number') {
      // If no elo param, elo is set to 0
      player.elo = null;
    } else {
      player.elo = user.elo;
    }

    // import player in matchmaking queue
    matchmakingQueue[player.username] = player;

    // notify the player
    return new Success(`Player ${player.username} added to queue`, matchmakingQueue);
  },
};
