import { expect } from 'chai';
import mmjs from '../src';

describe('Testing addPlayer', () => {
  it('wrong addPlayer properties', () => {
    expect(mmjs.addPlayer(1)).to.have.property('error');
  });
  it('empty addPlayer properties', () => {
    expect(mmjs.addPlayer()).to.have.property('error');
  });
  it('incorrect addPlayer object', () => {
    expect(mmjs.addPlayer('player')).to.have.property('error');
  });
  it('incorrect addPlayer username empty', () => {
    expect(mmjs.addPlayer({ username: '' })).to.have.property('error');
  });
  it('correct addPlayer username valid', () => {
    expect(mmjs.addPlayer({ username: 'player' })).to.not.have.property('error');
  });
  it('correct addPlayer username and elo', () => {
    expect(mmjs.addPlayer({ username: 'player', elo: 10 })).to.not.have.property('error');
  });
  it('correct addPlayer elo empty', () => {
    expect(mmjs.addPlayer({ username: 'player', elo: '' })).to.not.have.property('error');
  });
});
