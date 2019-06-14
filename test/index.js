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
      defaultQueue: '*',
      errorLogs: true,
      infoLogs: true
    })).to.have.property('info');
  });
});

describe('Testing matchmaking', () => {
  it('many players matchmaking', () => {
    for (let index = 0; index < 10; index++) {
      mmjs.matchmaking(log, `player${index}`);
      if(index === 9) {
        expect(mmjs.getRooms()).to.deep.equal([
            {
              "inGame": false,
              "name": 0,
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
              "name": 1,
              "players": [
                "player6",
                "player7",
                "player8",
                "player9"
              ]
            },
            {
              "inGame": false,
              "name": 2,
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
      "name": 1,
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
      "name": 0,
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
  it('kick player player3', () => {
    expect(mmjs.kickPlayer('player3')).to.equal(true);
  });
  it('cannot get player player3', () => {
    expect(mmjs.findPlayer('player3')).to.equal(false);
  });
});
