var SearchResults = Backbone.View.extend({
  template: App.templates.searchResults,
  events: {
    'click a': 'accessToCard'
  },
  close: function() {
    this.remove();
  },
  accessToCard: function(e) {
    e.preventDefault();
    var $e = $(e.currentTarget);
    var cardId = $e.data('searchid').toString();
    $('[data-id=' + cardId + ']').trigger('click');
  },
  matchByTitle: function(card) {
    return card.title.includes(this.input);
  },
  matchByDescription: function(card) {
    return card.description.includes(this.input);
  },
  findMatches: function() {
    var results = [];

    this.cards.forEach(function(card) {
      if (this.matchByTitle(card) || this.matchByDescription(card)) {
        results.push(card);
      }
    }, this);

    return results;
  },
  render: function() {
    var results = this.findMatches();
    this.$el.html(this.template({results: results}));
  },
  initialize: function (options) {
    this.cards = App.cards.toJSON();
    this.options = options || {};
    this.input = this.options.input;
    this.render();
  }
})