const _ = require('underscore');

module.exports = function(router, dataApi) {
  var listsApi = dataApi.listsApi;
  var cardsApi = dataApi.cardsApi;

  router.route('/deleteCard')
    .post(function(req, res, next) {
      var id = +req.body.id;
      var listId = +req.body.listId;
      cardsApi.delete(id);
      listsApi.deleteCardId(listId, id);
      res.json(true);
    })

  router.route('/updateSubscription')
    .post(function(req, res, next) {
      cardsApi.updateSubscription(req.body);
      res.json(true);
    })

  router.route('/dueDate')
    .post(function(req, res, next) {
      cardsApi.updateDueDate(req.body);
      res.json(true);
    })

  router.route('/comments')
    .post(function(req, res, next) {
      cardsApi.addComment(req.body);
      res.json(true);
    })

  router.route('/description')
    .post(function(req, res, next) {
      cardsApi.updateDescription(req.body);
      res.json(true);
    });

  router.route('/list')
    .post(function(req, res, next) {
      var list = req.body;
      list.cardIds = [];

      var lists = listsApi.set(list);
      listsApi.record();
      res.json(_(lists.data).findWhere({ id: lists.lastId }));
    });

  router.route('/cardListId')
    .post(function(req, res, next) {
      cardsApi.updateListId(req.body);
      res.json(true);
    })

  router.route('/card')
    .post(function(req, res, next) {
      var card = JSON.parse(req.body.data);
      card.description = card.description || '';
      card.labels = card.labels || [];
      card.dueDate = card.dueDate || '';
      card.time = card.time || '';
      card.comments = card.comments || [];
      card.subscribed = card.subscribed || false;
      card.listId = +card.listId;

      var cards = cardsApi.set(card);
      cardsApi.record();

      var card = _(cards.data).findWhere({ id: cards.lastId });
      listsApi.addCardIds(card.listId, card.id);
      res.json(card);
    });

  router.route('/labels')
    .post(function(req, res, next) {
      cardsApi.updateLabels(req.body);
      res.json(true);
    })

  router.route('/cardtitle')
    .post(function(req, res, next) {
      // console.log(req.body.title, req.body.cardId);
      cardsApi.updateTitle(req.body.title, req.body.cardId);
      res.json(true);
    })

  router.route('/listtitle/:listId')
    .post(function(req, res, next) {
      listsApi.updateTitle(req.body.title, req.body.listId);
      res.json(true);
    })

  function parseCardIds(cardIds) {
    var arrOfString = JSON.parse(cardIds);
    return arrOfString.map(function(id) {return +id})
  }

  router.route('/list/sort')
    .post(function(req, res, next) {
      var listId = +req.body.listId;
      var cardIds = parseCardIds(req.body.cardIds);
      listsApi.updateCardIds(listId, cardIds);
      res.json(true);
    })

  router.get('/board/:boardTitle', function(req, res, next) {
    res.render('board', {
      lists: listsApi.tempStore.data,
      cards: cardsApi.tempStore.data
    })
  });
};
