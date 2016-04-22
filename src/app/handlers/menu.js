'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var menuFactory = require('../../factory/menu');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('context-menu', function (action) {
    var galleryItem = components.gallery.findItem(action.filePath);
    if (!galleryItem) {
      galleryItem = {
        filePath: action.filePath,
        publicUrls: []
      };
    }
    var template = menuFactory.imageContext(dispatcher.dispatch, galleryItem);
    var menu = electron.Menu.buildFromTemplate(template);
    menu.popup();
  });

};
