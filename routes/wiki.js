var express = require('express')
var router = express.Router()

module.exports = router

var models = require('../db/models');
var Page = models.Page; 
var User = models.User; 

router.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  console.log(page)	

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save().then(function(pg){
  	res.redirect('/wiki/'+page.urlTitle);  	
  });

});

router.get('/', function(req, res, next) {
  res.redirect('/');
});



router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  //res.send('hit dynamic route at ' + req.params.urlTitle);
  // Page => find the page where urlTitle === req.params.urlTitle
  // .then => render page
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    res.render('wikipage')
  })
  .catch(next);
});



