//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveSettings } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsProvider(store, settings) {
  function provideSettings() {
    store.dispatch(receiveSettings(settings.serialize()));
  }

  // TODO: move call out of here
  provideSettings();

  return provideSettings;
}

settingsProvider.inject = ['store', 'settings'];
