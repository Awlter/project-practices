var Router = Backbone.Router.extend({
  routes: {
    "board/:board": "renderBoardPage"
  },
  renderBoardPage: function() {
    this.mainBoard = new MainBoardView();
    this.notificationsConsole = new NotificationsConsoleView();
    this.searchView = new SearchView();
    this.topBar = new TopBarView();
    this.newList = new NewListView();
    this.lists = new ListsView({collection: App.lists});
  }
})