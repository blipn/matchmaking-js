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
  it('incorrect addPlayer object', () => {
    expect(mmjs.addPlayer('test1')).to.not.have.property('error');
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

describe('Testing matchmaking', () => {
  it('many players matchmaking', () => {
    for (let index = 0; index < 10; index++) {
      mmjs.addPlayer(`player${index}`);
      console.log(mmjs.status());
    }
  });
  console.log(logs);
});
