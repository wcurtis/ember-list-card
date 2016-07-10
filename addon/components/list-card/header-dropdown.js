import Ember from 'ember';
import layout from '../../templates/components/list-card/header-dropdown';

export default Ember.Component.extend({
  tagName: 'li',
  layout: layout,

  classNames: ['list-card-header-dropdown', 'dropdown'],

  /**
   * Action when item is selected
   */
  onItemSelect: Ember.K,

  /**
   * Config for the dropdown items to populate
   *
   * {
   *   name: "Newest",
   *   queryOptions: {
   *     sort: "newest"
   *   }
   * }
   */
  dropdownItems: null,

  /**
   * Name of the dropdown label
   */
  name: null,

  /**
   * Active query tokens
   */
  queryTokens: null,

  computedName: Ember.computed('name', 'queryTokens', 'dropdownItems', function() {
    var activeQueryTokens = this.get('queryTokens');

    let matchedItems = this.get('dropdownItems').filter(dropdownItem => {
      let queryToken = dropdownItem.queryToken;

      let matchedTokens = activeQueryTokens.filter(activeQueryToken => {
        return activeQueryToken.equals(queryToken);
      });

      return !Ember.isEmpty(matchedTokens);
    });

    var matchedItemsCount = matchedItems.get('length');

    if (matchedItemsCount === 0) {
      return this.get('name');
    } else if (matchedItemsCount === 1) {
      return matchedItems.get('firstObject.name');
    } else {
      return `${matchedItemsCount} filters`;
    }
  }),

  isMultiselect: false,

  actions: {
    selectDropdownItem(dropdownItem) {
      if (this.get('isMultiselect')) {
        this.get('onItemSelect')(dropdownItem);
      } else {
        this.get('onItemReplace')(dropdownItem);
      }
    },
    deselectDropdownItem(dropdownItem) {
      this.get('onItemDeselect')(dropdownItem);
    },
  }
});
