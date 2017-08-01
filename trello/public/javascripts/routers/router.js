var Router = Backbone.Router.extend({
  routes: {
    "board/:board": "renderBoardPage"
  },
  renderBoardPage: function(board) {
    this.mainBoard = new MainBoardView();
    this.notificationsConsole = new NotificationsConsoleView();
    this.topBar = new TopBarView();
    this.newList = new NewListView();
    this.lists = new ListsView({collection: App.lists});
  }
})