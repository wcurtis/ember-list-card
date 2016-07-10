import Ember from 'ember';
import layout from '../../templates/components/list-card/header';

export default Ember.Component.extend({
  classNames: ['list-card-header-component', 'list-group-item'],

  layout: layout,

  /**
   * Action when queyr option is selected
   */
  onQueryOptionSelect: Ember.K,

  /**
   * Filter groups
   */
  filterGroups: null,

  /**
   * Name of the grid
   */
  title: null,

  /**
   * Active query tokens
   */
  queryTokens: null,

  actions: {
    selectItem(item) {
      this.get('onQueryTokenSelected')(item.queryToken);
    },
    deselectItem(item) {
      this.get('onQueryTokenDeselected')(item.queryToken);
    },
    replaceItem(item) {
      this.get('onQueryTokenReplaced')(item.queryToken);
    }
  }
});
