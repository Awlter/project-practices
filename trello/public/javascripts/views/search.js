var SearchView = Backbone.View.extend({
  el: ".search-area",
  events: {
    'focus input': 'showResult',
    'blur input': 'closeResult',
    'keyup input': 'search',
  },
  closeResult: function() {
    var self = this;
    setTimeout(function() {
      self.$input.val('');
      self.results.close();
    }, 10);

  },
  search: function() {
    var input = this.$input.val();

    if (this.results) {
      this.results.close()
    }

    this.results = new SearchResults({input: input});
    this.$el.append(this.results.el);
  },
  initialize: function() {
    this.$input = this.$('input');
  }
})