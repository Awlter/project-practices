module.exports = function(router, dataApi) {
  var listsApi = dataApi.listsApi;
  var cardsApi = dataApi.cardsApi;
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', {
      lists: listsApi.tempStore.data,
      cards: cardsApi.tempStore.data
    })
  });
};
