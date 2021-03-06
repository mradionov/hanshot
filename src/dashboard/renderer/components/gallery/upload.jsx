//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import React from 'react';

import viewDispatch from '~/dashboard/renderer/view-dispatch.js';
import { uploadImage } from '~/actions';

import Button from '../common/button.jsx';
import ButtonGroup from '../common/button-group.jsx';
import { Dropdown, DropdownItem } from '../common/dropdown.jsx';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function Upload(props) {
  const image = props.image;
  if (!image) {
    return null;
  }

  const hosts = props.metadata.uploadHosts;
  if (!(hosts && hosts.length)) {
    return null;
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => {
          viewDispatch(uploadImage(image.filePath));
        }}
      >
        Upload
      </Button>
      <Dropdown
        menuLeft
      >
        {hosts.map((host) =>
          <DropdownItem
            key={host.id}
            onClick={() => {
              viewDispatch(uploadImage(image.filePath, host.id));
            }}
          >
            {host.name}
          </DropdownItem>
        )}
      </Dropdown>
    </ButtonGroup>
  );
}

Upload.propTypes = {
  image: React.PropTypes.object,
  metadata: React.PropTypes.object,
};

Upload.defaultProps = {
  image: null,
  metadata: {
    uploadHosts: [],
  },
};
