var NotificationsConsoleView = Backbone.View.extend({
  className: 'notifications-console',
  template: App.templates.notifications,

  addNotifiction: function(notification) {
    this.$('ul').prepend('<li>' + notification + '</li>');
  },
  render: function() {
    this.$el.css({'display': 'none'});
    this.$el.html(this.template({notifications: App.notifications}));
    $('body').append(this.el);
  },
  initialize: function() {
    this.render();
    this.listenTo(App, "addNotifiction", this.addNotifiction.bind(this))
  }
})