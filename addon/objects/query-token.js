import Ember from 'ember';

export default Ember.Object.extend({
  key: null,
  value: null,

  equals(queryToken) {
    return queryToken.get('key') === this.get('key') && queryToken.get('value') === this.get('value');
  }
});
