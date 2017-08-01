var MainBoardView = Backbone.View.extend({
  el: 'form.add-list',
  template: App.templates.board,
  render: function() {
    $('header').after(this.template());
  },
  initialize: function() {
    this.render();
  }
})