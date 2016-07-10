import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-card/loading-mask', 'Integration | Component | list card/loading mask', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-card/loading-mask}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-card/loading-mask}}
      template block text
    {{/list-card/loading-mask}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
