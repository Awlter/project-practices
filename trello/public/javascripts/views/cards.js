var CardsView = Backbone.View.extend({
  className: 'cards',
  template: App.templates.cards,
  events: {
    'click .open-card-composer': 'openCardComposer',
    'click .icon-cross': 'closeCardComposer',
    'click [type=submit]': 'addNewCard'
  },

  toggleCardComposer: function() {
    this.$('.open-card-composer').toggle();
    this.$('.cc-controls-section').toggle();
  },
  openCardComposer: function(e) {
    e.preventDefault();

    this.toggleCardComposer();
  },
  closeCardComposer: function(e) {
    e && e.preventDefault();

    this.toggleCardComposer();
  },
  addNewCard: function(e) {
    e.preventDefault();
    var self = this;
    var $texterea = this.$('.new-card-title');
    var cardTitle = $texterea.val();
    var listId = this.$el.closest('.list').attr('data-listid');

    $.ajax({
      url: '/card',
      type: 'post',
      data: {data: JSON.stringify({title: cardTitle, listId: listId})},
      success: function(card) {
        App.trigger('addNewCard', card);
        self.renderCard(App.cards.last());
      }
    });

    $texterea.val('');
    this.closeCardComposer();
  },
  render: function() {
    this.$el.html(this.template());
    this.collection.forEach(this.renderCard.bind(this));
  },
  renderCard: function(cardModel) {
    this.card = new CardView({model: cardModel});
    this.$('.list-cards').append(this.card.el);
  },
  initialize: function() {
    this.render();
  }
})