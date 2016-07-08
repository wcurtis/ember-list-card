/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-list-card',

  /**
   * TODO: Set this dynamically based on env
   * Source: https://ember-cli.com/extending/#link-to-addon-while-developing
   */
  isDevelopingAddon: function() {
    return true;
  },

  /**
   * Required for using ember-cli-sass
   * See: https://github.com/aexmachina/ember-cli-sass#addon-usage
   */
  included: function(app) {
    this._super.included(app);
  }
};
