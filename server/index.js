//
//     Live Kinect
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var express    = require('express')
  , hbs        = require('hbs')
  , MongoStore = require('connect-mongo')(express);

var app = express();

app.set('view engine', 'hbs');
app.set('views', process.cwd() + '/views');

app.disable('x-powered-by');

app.use(express.compress());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(process.cwd() + '/client'));
app.use(express.favicon(process.cwd() + '/client/img/favicon.ico'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.session({
    store: new MongoStore({
      url: process.env.MONGO_URL
    }),
    secret: process.env.SESSION_SECRET
  }));
} else {
  app.use(express.session({ secret: '26FED8272B2849EF9275CB9BD284D36F' }));
}

hbs.registerPartials(process.cwd() + '/views/partials');

hbs.registerHelper('script', function() {
  return process.env.NODE_ENV === 'production' ? '/js/app.min.js': '/js/app.js';
});

//
// Bootstrap routes.
//
require('./routes')(app);

app.listen(process.env.PORT || 3000);
