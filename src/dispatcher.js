//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { EventEmitter } from 'events';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Dispatcher {

  constructor() {
    this.emitter = new EventEmitter();
  }

  dispatch(action) {
    // Spread action arguments to handler parameters
    this.emitter.emit(action.type, ...(action.args || []));
  }

  on(type, hanlder) {
    this.emitter.on(type, hanlder);
  }

}
