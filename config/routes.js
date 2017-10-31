//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
module.exports = function(app){

<<<<<<< HEAD
  app.get('/', template.index);
  app.get('/registration', template.regis);
  app.get('/requestQ', template.requestQ);
=======
  app.get('/', users.redirect);

  app.get('/gTutor', users.index);

  app.post('/gTutor/login', users.login);

  app.post('/gTutor/register', users.register);

  app.use(requiresLoggedUser);

  app.get('/gTutor/:id', users.dashboard);

  app.use(requiresLoggedADMIN);

  function requiresLoggedUser(req, res, next) {
    if (req.session.user || req.session.admin) {
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


>>>>>>> 83d18c40eb72ef0e2c9e0c31760c17f9d711575c

}
