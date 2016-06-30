//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class DashboardWindow extends Window {

  constructor() {
    super(
      'dashboard',
      `file://${__dirname}/dashboard-window/renderer/dashboard.html`
    );
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
