import Ember from 'ember';
import layout from '../../templates/components/list-card/error-item';

export default Ember.Component.extend({
  classNames: ['list-card-error-item', 'list-group-item'],
  layout: layout,

  attributeBindings: ['style'],

  /**
   * attr
   */
  minHeight: 0,

  style: Ember.computed('minHight', function() {
    var styles = [
      "min-height: " + this.get('minHeight') + "px"
    ];
    var style = styles.join(';') + ';';
    return new Ember.String.htmlSafe(style);
  }),
});
