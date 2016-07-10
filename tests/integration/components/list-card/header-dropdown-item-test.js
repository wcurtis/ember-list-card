import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-card/header-dropdown-item', 'Integration | Component | list card/header dropdown item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-card/header-dropdown-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-card/header-dropdown-item}}
      template block text
    {{/list-card/header-dropdown-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
