var ListView = Backbone.View.extend({
  className: "list-wrapper list",
  template: App.templates.list,
  events: {
    'blur .list-title': 'updateTitle'
  },

  updateTitle: function() {
    $.ajax({
      url: '/listtitle/' + this.listId,
      type: 'post',
      data: {title: this.$('.list-title').val(), listId: this.listId},
    })
  },

  updateCardIds: function(context, cardId) {
    var toListId = $(context).closest('.list').data('listid');
    var cardIds = $(context).sortable('toArray', {attribute: 'data-id'});
    var cardIds = cardIds.map(function(id) {return +id});
    var toPosition = cardIds.indexOf(cardId) + 1;
    var listId = App.cards.get(cardId).get('listId');

    console.log(toListId, toPosition, listId, cardIds);

    App.trigger('moveCard', {toListId: toListId, toPosition: toPosition, listId: listId, cardId: cardId});

    App.trigger('updateCardListId', {id: cardId, listId: toListId})

    $.ajax({
      url: '/cardListId',
      type: 'post',
      data: {id: cardId, listId: toListId}
    })
  },
  addJqueryUI: function() {
    var self = this;
    this.$(".list-cards").sortable({
      connectWith: ".list-cards",
      placeholder: "sortableholder",
      dropOnEmpty: 'true',

      start: function (event, ui) {
        ui.item.addClass('tilt');
      },
      stop: function (event, ui) {
        ui.item.removeClass('tilt');

        var listId = $(this).closest('.list').data('listid');

        //why ui.item.closest('.list').data('listid') and listId can be undefined?
        if (!listId) { return false;}

        if (ui.item.closest('.list').data('listid') === listId) {
          self.updateCardIds(this, ui.item.data('id'));
        }
      },
      receive: function(event, ui) {

        self.updateCardIds(this, ui.item.data('id'));
      }
    });
  },
  renderCards: function() {
    var cardIds = this.model.get('cardIds');
    var cardsForList = [];

    cardIds.forEach(function(id) {
      cardsForList.push(App.cards.findWhere({id: +id}));
    });

    this.cardsView = new CardsView({
      collection: cardsForList
    });

    this.$el.append(this.cardsView.el);
  },
  render: function () {
    this.listId = this.model.get('id');

    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr('data-listid', this.listId);

    this.renderCards();
    this.addJqueryUI();
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, 'change:cardIds', this.render.bind(this));
  }
})