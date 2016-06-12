//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveMetadata } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function metadataProvider(store, metadata) {
  function provideMetadata() {
    store.dispatch(receiveMetadata(metadata));
  }

  return provideMetadata;
}

metadataProvider.inject = ['store', 'metadata'];
