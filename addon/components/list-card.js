import Ember from 'ember';
import layout from '../templates/components/list-card';

/**
 * List card is a github-inspired grid for sorting and filtering collections of items
 *
 * It supports:
 * - Sorting
 * - Filtering
 * - Pagination
 * - Mass-actions (coming soon)
 * - Export (coming soon)
 *
 * Usage:
 *
 * Extend this grid to define a grid that loads a specific collection
 * via ember-data.
 *
 */
export default Ember.Component.extend({
  classNames: ['list-card-component'],

  /**
   * Ensures any components that extend this component
   * interit its template.
   *
   * Note: You must delete the template
   * for the child list-card in order for this one to get picked up
   */
  layout: layout,

  /**************************************************
   * These values can be overridden by the child component
   ***************************************************/

  /**
   * Override required.
   *
   * The name of the model to query
   * E.g. order
   */
  queryModelName: null,

  /**
   * Override required.
   *
   * The name of the list-card-item component for this grid.
   */
  listCardItemComponentName: null,

  /**
   * Set to true to add pagination UI elements and functionality
   */
  isPaginationEnabled: false,

  /**
   * Current page
   */
  page: 1,

  /**
   * Page size, can override
   */
  pageSize: 10,

  /**
   * When the grid is loading, it's nice to give it some height
   * so the page content doesn't jump when the items are finally
   * loaded.
   *
   * Value in pixels
   */
  minLoadingHeight: 500,

  /**
   * Options to pass the item component. Should be set
   * in the child list-card
   *
   * This is useful for passing flags like:
   * {
   *   showCustomer: false;
   * }
   */
  itemOptions: null,

  /**
   * Text in the header of the grid
   */
  title: null,

  /**************************************************
   * Internals, not to be overridden
   ***************************************************/

  /**
   * The loaded collection of items
   */
  items: null,

  /**
   * True when fetching data
   */
  isLoading: true,

  /**
   * Set if there's an error loading orders
   */
  error: null,

  /**
   * Array of query tokens that are currently active on the grid
   *
   * Can be initially set by either the child component or passed in
   */
  queryTokens: null,

  /**
   * Previous page is disabled when on page 1
   */
  previousPageDisabled: Ember.computed.equal('page', 1),

  /**
   * Set to true if items are loaded
   * but are empty
   */
  isEmpty: Ember.computed('isLoading', 'items', function() {
    return !this.get('isLoading') && Ember.isEmpty(this.get('items'));
  }),

  /**
   * Converts queryTokens into a queryOptions hash to be used
   * when fetching items with ember data.
   */
  queryOptions: Ember.computed('queryTokens', 'queryTokens.@each.{key,value}', function() {
    let queryOptions = {};

    this.get('queryTokens').forEach(queryToken => {
      queryOptions[queryToken.key] = queryToken.value;
    });

    return queryOptions;
  }),

  /**
   * Query options for pagination
   */
  paginationQueryOptions: Ember.computed('page', function() {
    return {
      page: this.get('page'),
      page_size: this.get('pageSize')
    }
  }),

  /**
   * Merges query options from sort / filters and pagination options
   */
  computedQueryOptions: Ember.computed('queryOptions', 'paginationQueryOptions', function() {
    var result = Ember.$.extend({}, this.get('queryOptions'), this.get('paginationQueryOptions'));
    return result;
  }),

  /**
   * Reload the collection when computedQueryOptions change
   */
  computedQueryOptionsChanged: Ember.observer('computedQueryOptions', function() {
    this.reloadItems();
  }),

  /**
   * Load items on render
   */
  didReceiveAttrs() {
    this.reloadItems();
  },

  /**
   * Fetch grid items with ember data
   */
  reloadItems() {
    var queryModelName = this.get('queryModelName');
    var queryOptions = this.get('computedQueryOptions');

    this.set('isLoading', true);
    this.store.query(queryModelName, queryOptions).then(items => {
      this.set('items', items);
    }).catch(err => {
      this.set('error', err);
    }).finally(() => {
      this.set('isLoading', false);
    });
  },

  actions: {
    /**
     * Go to previous page
     */
    previousPage() {
      if (this.get('page') > 1) {
        this.decrementProperty('page');
      }
    },

    /**
     * Go to next page
     */
    nextPage() {
      this.incrementProperty('page');
    },

    /**
     * Adds the queryToken given to the queryTokens array
     */
    addQueryToken(queryToken) {
      let queryTokens = this.get('queryTokens');
      queryTokens.pushObject(queryToken);
    },

    /**
     * Removes the given query token from the active query
     */
    removeQueryToken(queryTokenToRemove) {
      const queryTokens = this.get('queryTokens');
      const newQueryTokens = queryTokens.reject(queryToken => {
        return queryToken.equals(queryTokenToRemove);
      });
    },

    /**
     * Adds the given query token and removes any other tokens
     * with the same key.
     *
     * This is common with 'sort' since therer should only be one sort
     * selected
     */
    replaceQueryToken(queryTokenToAdd) {
      const queryTokens = this.get('queryTokens');

      // Remove any query tokens with the same key as the one
      // we're adding
      let newQueryTokens = queryTokens.reject(queryToken => {
        return queryToken.get('key') === queryTokenToAdd.get('key');
      });

      // Add the new query token
      newQueryTokens.pushObject(queryTokenToAdd);

      this.set('queryTokens', newQueryTokens);
    }
  }
});
