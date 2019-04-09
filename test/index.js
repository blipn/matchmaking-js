import logs from '../src/interface/logs';
import { expect } from 'chai';
import mmjs from '../src';

describe('Testing addPlayer', () => {
  it('wrong addPlayer properties', () => {
    expect(mmjs.addPlayer(1)).to.have.property('error');
  });
  it('empty addPlayer properties', () => {
    expect(mmjs.addPlayer()).to.have.property('error');
  });
  it('correct addPlayer string', () => {
    expect(mmjs.addPlayer('test1', 'myQueue')).to.not.have.property('error');
  });
  it('player already exists', () => {
    expect(mmjs.addPlayer('test1')).to.have.property('error');
  });
  it('incorrect addPlayer id empty', () => {
    expect(mmjs.addPlayer({ id: '' })).to.have.property('error');
  });
  it('correct addPlayer id valid', () => {
    expect(mmjs.addPlayer({ id: 'test2' })).to.not.have.property('error');
  });
  it('correct addPlayer id and elo', () => {
    expect(mmjs.addPlayer({ id: 'test3', elo: 10 })).to.not.have.property('error');
  });
  it('correct addPlayer elo empty', () => {
    expect(mmjs.addPlayer({ id: 'test4', elo: '' })).to.not.have.property('error');
  });
});

describe('Testing getPlayer', () => {
  it('get player test3', () => {
    expect(mmjs.getPlayer('test3')).to.deep.equal({ queue: '_', id: 'test3', elo: 10 });
  });
  it('get player 404', () => {
    expect(mmjs.getPlayer('404')).to.equal(false);
  });
});

describe('Testing setConfig', () => {
  it('set valid config', () => {
    expect(mmjs.setConfig({
      roomSize: 6,
      defaultQueue: '*',
      errorLogs: true,
      infoLogs: true
    })).to.have.property('info');
  });
});

describe('Testing kickPlayer', () => {
  it('kick player test3', () => {
    expect(mmjs.kickPlayer('test3')).to.have.property('info');
    expect(mmjs.kickPlayer('test4')).to.have.property('info');
  });
  it('cannot get player test3', () => {
    expect(mmjs.getPlayer('test3')).to.equal(false);
  });
});

describe('Testing status', () => {
  it('get default queue', () => {
    expect(mmjs.status()).to.deep.equal([]);
  });
  it('get all matchmaking queues', () => {
    expect(mmjs.status(null)).to.deep.equal([ { queue: 'myQueue', id: 'test1' }, { queue: '_', id: 'test2' } ]);
  });
  it('get \'myQueue\' matchmaking queue', () => {
    expect(mmjs.status('myQueue')).to.deep.equal([ { queue: 'myQueue', id: 'test1' } ]);
  });
});

describe('Testing matchmaking', () => {
  it('many players matchmaking', () => {
    for (let index = 0; index < 10; index++) {
      mmjs.addPlayer(`player${index}`);
    }
  });
});
