//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as renderer from '../../../renderer.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = renderer.createIpc('settings');

export default function viewDispatch(action) {
  ipc.sendMessage('action', action);
}
