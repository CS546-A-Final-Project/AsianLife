//Here you will import route files and export them as used in previous labs
import loginRoutes from './login.js';
import registerRoutes from './register.js';
import homeRoutes from './home.js';
import storeRoutes from './store.js';
import addStoreRoutes from './addStore.js';
import profileRoutes from './profile.js';
import uploadRoutes from './upload.js';
import logoutRoutes from './logout.js';
import errorRoutes from './error.js';
import passwordRoutes from './password.js';
import productsRoutes from './products.js';

const constructorMethod = (app) => {
  app.use('/login', loginRoutes);
  app.use('/register', registerRoutes);
  app.use('/home', homeRoutes);
  app.use('/store', storeRoutes);
  app.use('/addStore', addStoreRoutes);
  app.use('/profile', profileRoutes);
  app.use('/upload', uploadRoutes);
  app.use('/logout', logoutRoutes);
  app.use('/error', errorRoutes);
  app.use('/password', passwordRoutes);
  app.use('/products', productsRoutes);

  app.use('*', (req, res) => {
    res.status(404).render('error', { title: "404 NOT FOUND", error: "404 NOT FOUND" });
  });
};

export default constructorMethod;