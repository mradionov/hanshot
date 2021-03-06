//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy, stub } from 'sinon';

import Settings from '../../src/settings/settings';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

test('settings: set and get value', (assert) => {
  const settings = new Settings();

  settings.set('foo', 42);

  assert.equal(settings.get('foo'), 42);
  assert.end();
});

test('settings: get default value', (assert) => {
  const settings = new Settings();

  assert.equal(settings.get('foo'), undefined);
  assert.equal(settings.get('foo', 42), 42);
  assert.end();
});

test('settings: load from default source', (assert) => {
  const defaultReader = {
    read: stub().returns({ foo: 42 }),
  };
  const settings = new Settings(defaultReader);

  const valueBeforeLoad = settings.get('foo');
  settings.load();
  const valueAfterLoad = settings.get('foo');

  assert.equal(valueBeforeLoad, undefined);
  assert.equal(valueAfterLoad, 42);
  assert.end();
});

test('settings: override default by user source', (assert) => {
  const defaultReader = {
    read: stub().returns({ foo: 42 }),
  };
  const userReader = {
    read: stub().returns({ foo: 33 }),
  };
  const settings = new Settings(defaultReader, userReader);

  const valueBeforeLoad = settings.get('foo');
  settings.load();
  const valueAfterLoad = settings.get('foo');

  assert.equal(valueBeforeLoad, undefined);
  assert.equal(valueAfterLoad, 33);
  assert.end();
});

test('settings: save to user source not touching default', (assert) => {
  const defaultWriter = {
    write: spy(),
  };
  const userWriter = {
    write: spy(),
  };
  const settings = new Settings(defaultWriter, userWriter);

  settings.set('foo', 42);
  settings.save();

  assert.equal(defaultWriter.write.callCount, 0);
  assert.ok(userWriter.write.calledOnce);
  assert.deepEqual(userWriter.write.firstCall.args, [{ foo: 42 }]);
  assert.end();
});

test('settings: not carry defaults to user source', (assert) => {
  const defaultSource = {
    read: stub().returns({ foo: 42 }),
    write: spy(),
  };
  const userWriter = {
    write: spy(),
  };
  const settings = new Settings(defaultSource, userWriter);

  settings.set('bar', 33);
  settings.save();

  assert.equal(defaultSource.write.callCount, 0);
  assert.ok(userWriter.write.calledOnce);
  assert.deepEqual(userWriter.write.firstCall.args, [{ bar: 33 }]);
  assert.end();
});

test('settings: serialize by combining default and user', (assert) => {
  const defaultReader = {
    read: stub().returns({ foo: 42 }),
  };
  const userReader = {
    read: stub().returns({ foo: 33, bar: 10 }),
  };
  const settings = new Settings(defaultReader, userReader);

  settings.load();

  assert.deepEqual(settings.serialize(), { foo: 33, bar: 10 });
  assert.end();
});

test('settings: proceed with bad defailt source', (assert) => {
  const defaultReader = {
    read: stub().throws(),
  };
  const settings = new Settings(defaultReader);

  const fn = function fn() {
    settings.load();
  };

  assert.doesNotThrow(fn);
  assert.equal(settings.get('foo'), undefined);
  assert.deepEqual(settings.serialize(), {});
  assert.end();
});

test('settings: proceed with bad user source', (assert) => {
  const defaultReader = {
    read: stub().returns({ foo: 42 }),
  };
  const userReader = {
    read: stub().throws(),
  };
  const settings = new Settings(defaultReader, userReader);
  const fn = function fn() {
    settings.load();
  };

  assert.doesNotThrow(fn);
  assert.equal(settings.get('foo'), 42);
  assert.deepEqual(settings.serialize(), { foo: 42 });
  assert.end();
});

test('settings: proceed with write failure for user source', (assert) => {
  const defaultSource = {
    read: stub().returns({ foo: 42 }),
  };
  const userWriter = {
    write: stub().throws(),
  };
  const settings = new Settings(defaultSource, userWriter);
  const fn = function fn() {
    settings.save();
  };

  settings.load();

  assert.doesNotThrow(fn);
  assert.equal(settings.get('foo'), 42);
  assert.deepEqual(settings.serialize(), { foo: 42 });
  assert.end();
});
