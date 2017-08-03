var CardView = Backbone.View.extend({
  template: App.templates.card,
  modalTemplate: App.templates.modal,
  className: 'list-card',
  events: {
    "mouseover": 'showIcon',
    "mouseleave": 'hideIcon',
    "mouseover .edit-card": "selecting",
    "mouseleave .edit-card": "unselecting",
    "click .edit-card": "showEditArea",
    "click": "showCardDetail",
    "click .edit-input": "updatingTitle",
    "blur .edit-input": "updateInputTitle"
  },
  showCardDetail: function(e) {
    this.modal = new ModalView({model: this.model});
    $('body').append(this.modal.el);

    $('#card-modal').css({
      top: $(window).scrollTop() + 50
    });
  },
  hideEdit: function() {
    this.$('.edit-input').hide();
    this.$('.card-title').show();
  },
  updateInputTitle: function() {
    var newTitle = this.$('.edit-input').val();
    this.model.set('title', newTitle);

    this.hideEdit();
  },
  updatingTitle: function(e) {
    e.stopPropagation();
  },
  showEditArea: function(e) {
    e.stopPropagation()
    this.$('.edit-input').show();
    this.$('.card-title').hide();
  },
  unselecting: function() {
    this.$editCard.removeClass('selecting');
  },
  selecting: function() {
    this.$editCard.addClass('selecting');
  },
  showIcon: function() {
    this.$editCard.show();
  },
  hideIcon: function() {
    this.$editCard.hide();
  },
  updateTitle: function() {
    var title = this.model.get('title');
    this.$('.card-title').html(title);
    this.$('.edit-input').val(title);

    $.ajax({
      url: '/cardtitle',
      type: 'post',
      data: {title: title, cardId: this.model.get('id')}
    });
  },
  updateLabels: function() {
    if (this.model.get('labels').length !== 0) {
      this.$('.card-labels').show();
    } else {
      this.$('.card-labels').hide();
    }
    this.$('.card-labels').html('');
    this.model.get('labels').forEach(function(label) {
      this.$('.card-labels').append($('<span>').addClass(label)[0]);
    }, this)
  },
  updateDueDate: function () {
    var $dueDateArea = this.$('.card-dueDate');

    if (this.model.get('dueDate')) {
      $dueDateArea.show();
      $dueDateArea.find('span').html(this.model.get('dueDate'));
    } else {
      $dueDateArea.hide();
    }
  },
  updateSubscription: function() {
    var watching = this.$('.card-subscription');

    if(this.model.get('subscribed')) {
      watching.show();
    } else {
      watching.hide();
    }
  },
  removeCard: function() {
    this.remove();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr('data-id', this.model.get('id'));
  },
  initialize: function() {
    this.render();
    this.$editCard = this.$('.edit-card');
    this.listenTo(this.model, 'change:title', this.updateTitle);
    this.listenTo(this.model, 'change:labels', this.updateLabels);
    this.listenTo(this.model, 'change:dueDate', this.updateDueDate);
    this.listenTo(this.model, 'change:subscribed', this.updateSubscription);
    this.listenTo(this.model, 'remove', this.removeCard);
  }
})