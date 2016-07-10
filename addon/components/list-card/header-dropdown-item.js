import Ember from 'ember';
import layout from '../../templates/components/list-card/header-dropdown-item';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-card-header-dropdown-item'],
  layout: layout,

  /**
   * Passed in to component
   */
  dropdownItem: null,

  /**
   * Actions
   */
   onSelect: Ember.K,
   onDeselect: Ember.K,

  /**
   * Active query tokens
   */
  queryTokens: null,

  isSelected: Ember.computed('queryTokens.@each.{key,value}', 'queryTokens', 'dropdownItem', function() {
    let activeQueryTokens = this.get('queryTokens');
    let queryToken = this.get('dropdownItem.queryToken');

    console.log("Recomput isSelected");

    if (Ember.isBlank(queryToken)) {
      return false;
    }

    let matchedTokens = activeQueryTokens.filter(function(activeQueryToken) {
      return activeQueryToken.equals(queryToken);
      // return activeQueryToken.key === queryToken.key && activeQueryToken.value === queryToken.value;
    });

    return !Ember.isEmpty(matchedTokens);
  }),

  actions: {
    click() {
      if (this.get('isSelected')) {
        this.get('onDeselect')(this.get('dropdownItem'));
      } else {
        this.get('onSelect')(this.get('dropdownItem'));
      }
    }
  }
});
