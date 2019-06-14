import logs from '../src/interface/logs';
import { expect } from 'chai';
import mmjs from '../src';

function log(room){
  console.log(room);
}

describe('Testing setConfig', () => {
  it('set valid config', () => {
    expect(mmjs.setConfig({
      roomSize: 6,
      maxRooms: 3,
      errorLogs: true,
      infoLogs: true
    })).to.have.property('info');
  });
});

describe('Testing matchmaking', () => {
  it('10 players matchmaking', () => {
    for (let index = 0; index < 10; index++) {
      mmjs.matchmaking(log, `player${index}`);
      if(index === 9) {
        expect(mmjs.getRooms()).to.deep.equal([
            {
              "inGame": false,
              "id": 0,
              "players": [
                "player0",
                "player1",
                "player2",
                "player3",
                "player4",
                "player5"
              ]
            },
            {
              "inGame": false,
              "id": 1,
              "players": [
                "player6",
                "player7",
                "player8",
                "player9"
              ]
            },
            {
              "inGame": false,
              "id": 2,
              "players": []
            }
        ]);
      }
    }
  });
});

describe('Testing getPlayer', () => {
  it('find player player7', () => {
    expect(mmjs.findPlayer('player7')).to.deep.equal({
      "inGame": false,
      "id": 1,
      "players": [
        "player6",
        "player7",
        "player8",
        "player9"
      ]
    });
  });
  it('get player 404', () => {
    expect(mmjs.findPlayer('404')).to.equal(false);
  });
});


describe('Testing kickPlayer', () => {
  it('can get player player3', () => {
    expect(mmjs.findPlayer('player3')).to.deep.equal({
      "inGame": false,
      "id": 0,
      "players": [
        "player0",
        "player1",
        "player2",
        "player3",
        "player4",
        "player5"
      ]
    });
  });
  it('can lock a room', () => {
    expect(mmjs.lockRoom(0)).to.equal(true);
    expect(mmjs.getRoom(0)).to.deep.equal({ 
      id: 0,
      inGame: true,
      players: [ 'player0', 'player1', 'player2', 'player3', 'player4', 'player5' ] });
  });
  it('player failed to join room', () => {
    expect(mmjs.goToRoom(0,'player3')).to.equal(false);
  });

  it('kick player player3', () => {
    expect(mmjs.kickPlayer('player3')).to.equal(true);
  });
  it('cannot get player player3', () => {
    expect(mmjs.findPlayer('player3')).to.equal(false);
  });
});
