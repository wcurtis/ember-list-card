# Ember List Card

A github-inspired list component for Ember apps

## Installation

```
ember install ember-list-card
```

## Usage

Create a list-card and list-card-item component
```
# Create a list-card component which will extend this addon's component
ember g component customers/list-card

# Create a list-card-item component which will render each row in the list
ember g component customer/list-card-item
```

Extend this addon's list-card component and add the model name and item component
```javascript
// components/customers/list-card.js
import Ember from 'ember';
import ListCardComponent from 'ember-list-card/components/list-card';

export default ListCardComponent.extend({
  /**
   * Define the Ember data model to use
   */
  queryModelName: 'customer',

  /**
   * Define the item component to render for each row
   */
  listCardItemComponentName: "customer/list-card-item",
});
```

This components supports filtering and sorting 
```js
// components/customers/list-card.js
import Ember from 'ember';
import ListCardComponent from 'ember-list-card/components/list-card';
import { QueryToken, QueryFilter, FilterGroup } from 'ember-list-card';

export default ListCardComponent.extend({
  ...

  filterGroups: Ember.computed(function() {
    let filterGroups = [
      FilterGroup.create({
        name: 'Stars',
        filterOptions: [
          QueryFilter.create({
            name: '3 stars',
            queryToken: QueryToken.create({
              key: 'star_rating',
              value: '3'
            }),
          }),
          QueryFilter.create({
            name: '2 stars',
            queryToken: QueryToken.create({
              key: 'star_rating',
              value: '2'
            }),
          }),
          QueryFilter.create({
            name: '1 star',
            queryToken: QueryToken.create({
              key: 'star_rating',
              value: '1'
            }),
          }),
        ]
      }),
      // other FilterGroup's
    ];
    return filterGroups;
  })
});
```

## Developing

```
# Clone the repo
git clone git@github.com:wcurtis/ember-list-card.git

# Link the repo to npm so it's registered locally
cd ember-list-card
npm link

# Add `ember-list-card` as a dependency in your package.json of the hosting app
"ember-list-card": "*"

# Run npm link in the hosting app to link to the local addon
npm link ember-list-card
```

## Roadmap
- Mass actions
- Export to csv
