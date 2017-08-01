var ModalView = Backbone.View.extend({
  template: App.templates.modal,
  events: {
    'click .show-labels': 'showLabels',
    'click #modal-layer': 'hideModal',
    'blur .modal-title': 'changeTitle',
    'click .add-description': 'showDescriptionControl',
    'click .edit-description': 'showDescriptionExistedControl',
    'click .icon-cross': 'closeDescriptionControl',
    'click .description-control-section .submit-button': 'updateDescription',
    'click .modal-comments input': 'addComment',
    'click .labels': 'toggleLabels',
    'click .show-labels a': 'selectLabel',
    'click .show-dueDate': 'toggleDueDate',
    'click .picker-console [value=Save]': 'updateDueDate',
    'click .picker-console [value=Remove]': 'removeDueDate',
    'click .action-move': 'toggleActionMove',
    'click [value=Move]': 'moveCard',
    'click .action-copy': 'toggleActionCopy',
    'click [value=Copy]': 'copyCard',
    'click .action-subscribe': 'changeSubscriptionState',
    'click .action-delete': 'deleteCard'
  },
  deleteCard: function() {
    var id = this.model.get('id');
    var listId = this.model.get('listId');
    var data = {id: id, listId: listId};

    App.trigger('deleteCard', data);
    $.ajax({
      url: '/deleteCard',
      type: 'post',
      data: data
    })

    this.hideModal();
  },
  changeSubscriptionState: function() {
    if (this.subscribed) {
      this.$('.action-subscribe span').removeClass('on').addClass('off')
    } else {
      this.$('.action-subscribe span').removeClass('off').addClass('on')
    }

    this.model.set('subscribed', !this.subscribed);
    this.subscribed = !this.subscribed;

    $.ajax({
      url: '/updateSubscription',
      type: 'post',
      data: {id: this.model.get('id'), subscribed: this.subscribed}
    })
  },
  copyCard: function() {
    var newTitle = this.$('#newTitle').val().trim();
    var toListId = +this.$('#listCopy').val().trim();
    var toPosition = +this.$('#positionCopy').val().trim();

    if (!(newTitle && toListId && toPosition)) {return false};
    if (App.lists.length < toListId) {return false};
    if (App.lists.get(toListId).get('cardIds') + 1 < toPosition) {return false}

    var newCard = this.model.toJSON();
    newCard.title = newTitle;
    newCard.listId = toListId;

    delete newCard['id'];

    $.ajax({
      url: '/card',
      type: 'post',
      data: {data: JSON.stringify(newCard)},
      success: function(card) {
        App.trigger('copyCard', {card: card, toPosition: toPosition})
      }
    })

  },
  toggleActionCopy: function() {
    this.$('.modal-copy').toggle();
  },
  moveCard: function() {
    var toListId = +this.$('#listMoved').val();
    var toPosition = +this.$('#positionMoved').val();
    var listId = this.model.get('listId');
    var cardId = this.model.get('id');

    this.model.set('listId', toListId);

    App.trigger('moveCard', {toListId: toListId, toPosition: toPosition, listId: listId, cardId: cardId});
  },
  toggleActionMove: function() {
    this.$('.modal-move').toggle();
  },
  renderDueDate: function() {
    var $dueDateArea = this.$('.modal-dueDate');
    var dueDate = this.model.get('dueDate');

    if (dueDate) {
      $dueDateArea.show();
    } else {
      $dueDateArea.hide();
    }

    $dueDateArea.find('p').html(dueDate);
  },
  removeDueDate: function() {
    this.$('#date').val('');
    this.updateDueDate();
  },
  updateDueDate: function() {
    var dueDate = this.$('#date').val();
    var time = this.$('#time').val();

    this.model.set('dueDate', dueDate);
    this.model.set('time', time);

    this.renderDueDate();

    $.ajax({
      url: '/dueDate',
      type: 'post',
      data: {id: this.model.get('id'), time: time, dueDate: dueDate}
    })

    this.toggleDueDate();
    var notification = `Card ${this.model.get('id')} updated due date to: ${dueDate}`;
    App.trigger('addNotifiction', notification);
  },
  toggleDueDate: function() {
    this.$('#date-picker').toggle();
  },
  selectLabel: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var label = e.currentTarget.id;
    var labels = this.model.get('labels');
    var notification;
    this.labels = [];

    if (labels.indexOf(label) === -1) {
      labels.forEach(function(label) {this.labels.push(label)}, this);
      this.labels.push(label);
      notification = `Card ${this.model.get('id')} added label: ${label}`
    } else {
      this.labels = _.without(labels, label);
      notification = `Card ${this.model.get('id')} deleted label: ${label}`
    }

    App.trigger('addNotifiction', notification);

    this.model.set('labels', this.labels);
    this.renderLabels()

    $.ajax({
      url: "/labels",
      type: "post",
      data: {id: this.model.get('id'), labels: JSON.stringify(this.labels)}
    });
  },
  renderLabels: function() {
    var $labelsArea = this.$('.modal-labels');

    if (this.labels.length === 0) {
      $labelsArea.hide();
    } else {
      $labelsArea.show();
    }

    $labelsArea.find('ul').html('');
    this.labels.forEach(function(label) {
      $labelsArea.find('ul').append("<li><img src=\"/images/"+ label +".png\"></li>");
    }, this);
  },
  toggleLabels: function() {
    this.$(".show-labels").toggle();
  },
  addComment: function() {
    var $commentArea = this.$('.modal-comments').find('textarea');
    var comment = $commentArea.val();
    var comments = this.model.get('comments');
    comments.unshift(comment);
    this.model.set('comments', comments);

    this.$('.activity-list').prepend('<p>' + comment + '</p>');

    $commentArea.val('');

    $.ajax({
      url: '/comments',
      type: 'post',
      data: {id: this.model.get('id'), comments: JSON.stringify(this.model.get('comments'))}
    })

    if (this.subscribed) {
      var notification = `Card ${this.model.get('id')} added comment: "${comment}"`
      App.trigger('addNotifiction', notification);
    }
  },
  updateDescription: function(e) {
    e.preventDefault();

    var input = this.$(".description-input").val();
    this.model.set('description', input);
    this.$(".description-show").find('p').html(input);

    $.ajax({
      url: '/description',
      type: 'post',
      data: {description: input, id: this.model.get('id')}
    })

    this.closeDescriptionControl();

    var notification = `Card ${this.model.get('id')} updated description to: ${input}`;
    App.trigger('addNotifiction', notification);
  },
  showDescriptionExistedControl: function(e) {
    e.preventDefault();
    this.$(".description-show").find('p').hide();
    this.$(".description-control-section").show().find('textarea').html(this.model.get('description'));
  },
  closeDescriptionControl: function(e) {
    e && e.preventDefault();
    this.$(".description-control-section").hide();

    if (this.model.get('description').length) {
      this.$(".description-show").show();
      this.$(".description-show").find('p').show();
    } else {
      this.$('.add-description').show();
      this.$(".description-show").hide();
    }
  },
  showDescriptionControl: function(e) {
    e.preventDefault();
    this.$(".description-control-section").show();
    this.$(".add-description").hide();
  },
  changeTitle: function() {
    var newTitle = this.$('.modal-title').val();
    this.model.set('title', newTitle);

    var notification = `Card ${this.model.get('id')} editted title to: ${newTitle}`;
    App.trigger('addNotifiction', notification);
  },
  hideModal: function() {
    this.remove();
  },
  render: function() {
    var listId = this.model.get('listId')
    var listTitle = App.lists.get(+listId).get('title');
    var passToTemplate = this.model.toJSON();
    passToTemplate.listTitle = listTitle;
    this.$el.html(this.template(passToTemplate));
  },
  renderDatePicker: function () {
    var self = this;
    this.$("#date-picker").datepicker({
      changeMonth:true,
      changeYear:true,
      onSelect: function(dataText) {
        self.$('#date').val(dataText);
      }
    });
  },
  initialize: function() {
    this.render();
    this.renderDatePicker();
    this.subscribed = this.model.get('subscribed');
  }
})