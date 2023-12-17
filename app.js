//Here is where you'll set up your server as shown in lecture code
import express from 'express';
const app = express();
import session from 'express-session';
import configRoutes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AsianLife',
    secret: "This is our final project",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 600000 }
  })
);

app.use('/', (req, res, next) => {
  const currentTime = new Date().toUTCString();
  const requestMethod = req.method;
  const requestRoute = req.originalUrl;
  if (!req.session.user) {
    console.log(`[${currentTime}]: ${requestMethod} ${requestRoute} (Non-Authenticated User)`);
  } else if (req.session.user.role === 'admin') {
    console.log(`[${currentTime}]: ${requestMethod} ${requestRoute} (Authenticated Admin User)`);
  } else if (req.session.user.role === 'user') {
    console.log(`[${currentTime}]: ${requestMethod} ${requestRoute} (Authenticated Normal User)`);
  }

  if (requestRoute === '/') {
    if (!req.session.user) {
      return res.status(200).redirect('/login');
    } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId) {
      return res.status(200).redirect(`/store/${req.session.user.ownedStoreId}`);
    } else if (req.session.user.role === 'admin' && !req.session.user.ownedStoreId) {
      return res.status(200).redirect('/addStore');
    } else if (req.session.user.role === 'user') {
      return res.status(200).redirect('/home');
    }
  }
  next();
});

app.use('/login', (req, res, next) => {
  if (!req.session.user) {
    next();
  } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId) {
    return res.status(200).redirect(`/store/${req.session.user.ownedStoreId}`);
  } else if (req.session.user.role === 'admin' && !req.session.user.ownedStoreId) {
    return res.status(200).redirect('/addStore');
  } else if (req.session.user.role === 'user') {
    return res.status(200).redirect('/home');
  }
});

app.use('/register', (req, res, next) => {
  if (!req.session.user) {
    next();
  } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId) {
    return res.status(200).redirect(`/store/${req.session.user.ownedStoreId}`);
  } else if (req.session.user.role === 'admin' && !req.session.user.ownedStoreId) {
    return res.status(200).redirect('/addStore');
  } else if (req.session.user.role === 'user') {
    return res.status(200).redirect('/home');
  }
});

app.use('/home', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/store', (req, res, next) => {
  const requestRoute = req.originalUrl;
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  }
  //if (requestRoute === '/store' || requestRoute === '/store/') {
    //return res.status(200).redirect('/home');
  //} 
  else {
    next();
  }
});

app.use('/addStore', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else if (req.session.user.role === 'user') {
    req.session.error = "The user does not have permission to view the page";
    req.session.errorCode = 403;
    return res.status(403).redirect('/error');
  } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId) {
    return res.status(200).redirect(`/store/${req.session.user.ownedStoreId}`);
  } else {
    next();
  }
});

app.use('/profile', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/upload', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/logout', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/password', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/editStore/:id', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else if (req.session.user.role === 'user') {
    req.session.error = "The user does not have permission to view the page";
    req.session.errorCode = 403;
    return res.status(403).redirect('/error');
  } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId === req.params.id) {
    
    next();
  }
});

app.use('/addProduct', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else if (req.session.user.role === 'user') {
    req.session.error = "The user does not have permission to view the page";
    req.session.errorCode = 403;
    return res.status(403).redirect('/error');
  } else if (req.session.user.role === 'admin' && req.session.user.ownedStoreId) {
    next();
  }
});

app.use('/products', (req, res, next) => {
  const requestRoute = req.originalUrl;
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  }
  if (requestRoute === '/products' || requestRoute === '/products/') {
    return res.status(200).redirect('/home');
  } else {
    next();
  }
});

app.use('/reviewsForProducts', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/storeComments', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

app.use('/commentsDetail', (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).redirect('/login');
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
