var express    = require('express')
  , path       = require('path')
  , hbs        = require('hbs')
  , phalanx    = require('phalanx')
  , MongoStore = require('connect-mongo')(express);

var app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

app.disable('x-powered-by');

app.use(express.compress());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.favicon(path.resolve(__dirname, '../client/img/favicon.ico')));

app.configure('production', function() {
  app.set('script', '/js/app.min.js');
  app.use(express.session({
    store: new MongoStore({
      url: process.env.MONGO_URL
    })
  , secret: process.env.SESSION_SECRET
  }));
});

app.configure('development', function() {
  app.set('script', '/js/app.js');
  app.use(express.session({ secret: '26FED8272B2849EF9275CB9BD284D36F' }));
});

hbs.registerPartials(path.resolve(__dirname, '../views/partials'));

//
// Bootstrap modules.
//
require('./routes')(app);

app.get('*', function(req, res) {
  phalanx.notFound('Page not found.').render(res, 'error');
});

require('express-trace')(app);
app.listen(process.env.PORT || 3000);
