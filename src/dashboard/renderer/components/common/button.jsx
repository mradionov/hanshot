//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Button(props) {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: React.PropTypes.node,
};
