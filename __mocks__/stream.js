// Mock Node.js stream module for jsdom environment
const { EventEmitter } = require('events');

class Readable extends EventEmitter {
  constructor() {
    super();
  }
  read() {}
  setEncoding() {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
}

class Writable extends EventEmitter {
  constructor() {
    super();
  }
  write() {
    return true;
  }
  end() {}
}

class Transform extends Writable {
  constructor() {
    super();
  }
  _transform() {}
}

module.exports = {
  Readable,
  Writable,
  Transform,
  PassThrough: Transform,
};
