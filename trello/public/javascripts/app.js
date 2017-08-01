App = {
  templates: JST,
  setupRouter: function() {
    Backbone.history.start({pushState: true});
  },
  copyCard: function(data) {
    var card = data.card;
    var toPosition = data.toPosition;
    var list = this.lists.get(card.listId);

    var cardIds = this.toCardIdsPosition({cardId: card.id, toListId: card.listId, toPosition: toPosition});

    this.cards.add(card);
    list.set('cardIds', cardIds);
  },
  moveCard: function(data) {
    var toListId = data.toListId;
    var toPosition = data.toPosition;

    var list = this.lists.get(+toListId);

    if (!list) {
      return false
    };

    var cardIds = list.get('cardIds');

    if (cardIds.length + 1 < toPosition) {
      return false;
    }
    this.updatePreListCardIds(data);
    this.updateToListCardIds(data);
  },
  syncCardIds: function(listId, cardIds) {
    $.ajax({
      url: '/list/sort',
      type: 'post',
      data: {listId: listId, cardIds: JSON.stringify(cardIds)},
    });
  },
  toCardIdsPosition: function(data) {
    var list = this.lists.get(+data.toListId);
    var cardIds = list.get('cardIds');

    var cardIdsPart1 = cardIds.slice(0, +data.toPosition - 1);
    cardIdsPart1.push(data.cardId);
    var cardIdsPart2 = cardIds.slice(+data.toPosition - 1);
    return cardIdsPart1.concat(cardIdsPart2);
  },
  updatePreListCardIds: function(data) {
    var list = this.lists.get(+data.listId);
    var cardIds = list.get('cardIds');

    var preCardIds = _.without(cardIds, data.cardId);

    list.set('cardIds', preCardIds);
    console.log(preCardIds);
    this.syncCardIds(+data.listId, preCardIds);
  },
  updateToListCardIds: function(data) {
    var list = this.lists.get(+data.toListId);
    var toCardIds = this.toCardIdsPosition(data);

    list.set('cardIds', toCardIds);

    console.log(toCardIds);
    this.syncCardIds(+data.toListId, toCardIds);
  },
  updateCardListId: function(data) {
    this.cards.get(+data.id).set('listId', data.listId);
  },
  addNewList: function(list) {
    this.lists.add(list);
  },
  addNewCard: function(card) {
    this.cards.add(card);
    this.lists.get(card.listId).get('cardIds').push(card.id);
  },
  addNotification: function(notification) {
    this.notifications.unshift(notification);
  },
  deleteCardIdFromList: function(data) {
    var list = this.lists.get(data.listId);
    var cardIds = list.get('cardIds');
    var newCardIds = _.without(cardIds, data.id);
    list.set('cardIds', newCardIds);
  },
  deleteCard: function(data) {
    var id = data.id;
    this.cards.remove(id);
    this.deleteCardIdFromList(data);
  },
  updateStorage: function() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  },
  readStorage: function() {
    var stored = localStorage.getItem('notifications');

    if (stored) {
      this.notifications = JSON.parse(stored);
    } else {
      this.notifications = [];
    }
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on('addNewList', this.addNewList.bind(this));
    this.on('addNewCard', this.addNewCard.bind(this));
    this.on('updateCardListId', this.updateCardListId.bind(this));
    this.on('moveCard', this.moveCard.bind(this));
    this.on('copyCard', this.copyCard.bind(this));
    this.on('addNotifiction', this.addNotification.bind(this));
    this.on('deleteCard', this.deleteCard.bind(this));
    window.addEventListener('unload', App.updateStorage.bind(App));
  },
  init: function(lists, cards) {
    this.readStorage();
    this.bindEvents();
    this.lists = new Lists(lists);
    this.cards = new Cards(cards);
    this.router = new Router();
    this.setupRouter();
  }
}