var NewListView = Backbone.View.extend({
  el: 'form.add-list',
  template: App.templates.newList,
  events: {
    'click .placeholder': 'showInput',
    'click .icon-cross': 'hideInput',
    'submit': 'addNewList'
  },

  showInput: function() {
    this.$('.placeholder').hide();
    this.$('.add-input').fadeIn();
  },
  hideInput: function() {
    this.$('.add-input').hide();
    this.$('.placeholder').fadeIn();
  },
  addNewList: function(e) {
    e.preventDefault();

    var title = this.$('[type=text]').val();
    if (!title.trim()) {
      return false
    }

    $.ajax({
      url: '/list',
      type: 'post',
      data: {title: title},
      success: function(json) {
        App.trigger('addNewList', json);
      }
    })

    this.hideInput();
    this.el.reset();
  }
})
