var TopBarView = Backbone.View.extend({
  className: 'top-bar',
  template: App.templates.topBar,
  notificationsTemplate: App.templates.notifications,
  events: {
    'click .top-notifications': 'toggleNotifications'
  },

  toggleNotifications: function() {
    console.log('hehe');
    $('.notifications-console').toggle()
  },
  render: function() {
    $('header').append(this.$el.html(App.templates.topBar()))
  },
  initialize: function() {
    this.render();
    this.showingNotification = false;
  }
})