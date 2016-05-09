//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as clipboard from '../clipboard';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  create() {
    return function copyTextHandler(text) {
      clipboard.writeText(text);
    };
  },

};

