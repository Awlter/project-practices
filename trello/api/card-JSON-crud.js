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
  updateSubscription: function(input) {
    if (input.subscribed === 'true') {
      this.get(+input.id).subscribed = true;
    } else {
      this.get(+input.id).subscribed = false;
    }

    this.record();
  },
  updateDueDate: function(input) {
    var id = input.id;
    var card = this.get(+id);
    card.dueDate = input.dueDate;
    card.time = input.time;
    this.record();
  },
  updateLabels: function(input) {
    var id = input.id;
    var labels = JSON.parse(input.labels);
    this.get(+id).labels = labels;
    this.record();
  },
  addComment: function(input) {
    var id = input.id;
    var comments = JSON.parse(input.comments);
    this.get(+id).comments = comments;
    this.record();
  },
  updateDescription: function(input) {
    this.get(+input.id).description = input.description;
    this.record();
  },
  updateListId: function(input) {
    var id = input.id;
    var listId = input.listId;
    this.get(+id).listId = +listId;
    this.record();
  },
  set: function set(input) {
    this.tempStore.lastId += 1;
    input.id = this.tempStore.lastId;
    this.tempStore.data.push(input);

    return this.tempStore;
  },
  delete: function(id) {
    var idx = _(this.tempStore.data).findIndex({ id: id });
    this.tempStore.data.splice(idx, 1);
    this.record();
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
