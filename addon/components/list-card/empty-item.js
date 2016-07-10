import Ember from 'ember';
import layout from '../../templates/components/list-card/empty-item';

export default Ember.Component.extend({
  classNames: ['list-card-empty-item-component', 'list-group-item'],
  attributeBindings: ['style'],
  layout: layout,

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
