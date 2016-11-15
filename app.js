var morgan = require('morgan')
var express = require('express');
var app = express();
express.static('./public')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var models = require('./db/models');

var wikiRouter = require('./routes/wiki');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
// ...
app.use('/wiki', wikiRouter);

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);






// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);