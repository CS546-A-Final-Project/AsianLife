//Here you will import route files and export them as used in previous labs
import loginRoutes from './login.js';
import registerRoutes from './register.js';
import homeRoutes from './home.js';
import storeRoutes from './store.js';
const constructorMethod = (app) => {
  app.use('/', loginRoutes);
  app.use('/register', registerRoutes);
  app.use('/home', homeRoutes)  
  app.use('/store', storeRoutes);
  app.use('*', (req, res) => {
    res.status(404).render('error', { title: "404 NOT FOUND", error: "404 NOT FOUND" });
  });
};

export default constructorMethod;