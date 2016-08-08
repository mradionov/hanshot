//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function DropdownItem(props) {
  return (
    <li
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}

DropdownItem.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
};
