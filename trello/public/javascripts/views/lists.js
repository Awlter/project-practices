var ListsView = Backbone.View.extend({
  el: '.lists',

  render: function() {
    this.collection.each(this.renderList.bind(this));
  },
  renderList: function(list) {
    var listView = new ListView({
      model: list
    });

    this.$el.append(listView.el);
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add', this.renderList);
  }
})