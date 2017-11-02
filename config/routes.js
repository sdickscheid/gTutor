//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js");
const posts = require("../controllers/posts.js");
const helps = require("../controllers/helps.js");


module.exports = function(app){

  app.get('/', users.redirect);

  app.get('/gTutor', users.index);

  app.post('/gTutor/login', users.login);

  app.post('/gTutor/register', users.register);

  app.use(requiresLoggedUser);

  app.get('/gTutor/posts', posts.getAll);

  app.post('/gTutor/posts', posts.createOne);

  app.get('/gTutor/posts/help/:postID', helps.index);

  app.post('/gTutor/posts/help/:postID', helps.createOne);

  app.get('/gTutor/posts/:helpID/:action', helps.action);

  //add fallback

  app.use(function(req, res) {
    res.send('ROUTE NOT FOUND.');
  })

  app.use(requiresLoggedADMIN);

  function requiresLoggedUser(req, res, next) {
    if (req.session.user || req.session.admin) {
      console.log('req.session.user', req.session.user);
      next();
    } else {
      res.redirect('/gTutor')
    }
  }

  function requiresLoggedADMIN(req, res, next) {
    if (req.session.admin) {
      next();
    } else {
      res.redirect(`/gTutor/${req.session.user}`);
    }
  }


}
