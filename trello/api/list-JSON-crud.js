var fs = require('fs');
var _ = require('underscore');

module.exports = {
  JSONFilePath: '',
  tempStore: {},
  read: function read() {
    this.tempStore = JSON.parse(fs.readFileSync(this.JSONFilePath, 'utf8'));
    return this.tempStore;
  },
  getLastId: function getLastId() {
    return this.tempStore.lastId;
  },
  get: function get(id) {
    return _(this.tempStore.data).findWhere({ id: id });
  },
  addCardIds: function(listId, cardId) {
    this.get(+listId).cardIds.push(cardId);
    this.record();
  },
  updateTitle: function(title, listId) {
    this.get(+listId).title = title;
    this.record();
  },
  updateCardIds: function(listId, cardIds) {
    this.get(+listId).cardIds = cardIds;
    this.record();
  },
  deleteCardId: function(listId, cardId) {
    this.get(listId).cardIds = _.without(this.get(listId).cardIds, cardId);
    this.record();
  },
  set: function set(input) {
    // var newData = Object.assign({}, input);
    this.tempStore.lastId += 1;
    // newData.id = this.tempStore.lastId;
    input.id = this.tempStore.lastId;
    // this.tempStore.data.push(newData);
    this.tempStore.data.push(input);

    return this.tempStore;
  },
  delete: function _delete(id) {
    var idx = _(this.tempStore.data).findIndex({ id: id });
    return _.first(this.tempStore.data.splice(idx, 1));
  },
  record: function record() {
    fs.writeFileSync(this.JSONFilePath, JSON.stringify(this.tempStore), 'utf8');
  },
  init: function init(filePath) {
    this.JSONFilePath = filePath;
    this.read();
    return this;
  }
};
