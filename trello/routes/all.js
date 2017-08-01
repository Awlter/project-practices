var fs = require('fs');
var path = require('path');
var express = require('express');

var router = express.Router();
var routeFiles = ['index', 'boards'];

var listsFilePath = path.resolve(path.dirname(__dirname), 'data/lists.json');
var cardsFilePath = path.resolve(path.dirname(__dirname), 'data/cards.json');

var listsApi = Object
    .create(require(path.resolve(path.dirname(__dirname), 'api/list-JSON-crud.js')))
    .init(listsFilePath);

var cardsApi = Object
    .create(require(path.resolve(path.dirname(__dirname), 'api/card-JSON-crud.js')))
    .init(cardsFilePath);

var dataApi = {listsApi: listsApi, cardsApi: cardsApi};

routeFiles.forEach(function(route) {
  require(path.resolve(path.dirname(__dirname), `routes/${route}`))(router, dataApi);
});

module.exports = router;
