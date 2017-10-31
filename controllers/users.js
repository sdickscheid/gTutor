const knex = require("../db/knex.js");
const encryption = require("../config/encryption.js");

module.exports = {
  redirect: function(req, res) {
    res.redirect('/gTutor');
  },

  index: function(req, res) {
    let messageToPage = "";
    if (req.session.message) {
      messageToPage = req.session.message;
      req.session.message = "";
    }
    res.render('h_loginPage', {message: messageToPage});
  },

  login: function(req, res) {
    knex('users')
      .where('email', req.body.email)
      .then((encryptedUser) => {
        user = encryptedUser[0];
        encryption.check(user, req.body)
          .then((isMatch) => {
            if (isMatch) {
              if (user.role === 'ADMIN') {
                req.session.admin = user.id;
                console.log(`${user.first_name} is an admin.`);
              } else {
                req.session.user = user.id;
                console.log(`${user.first_name} is NOT an admin.`)
              }

              req.session.save((err) => {
                if (err) throw err;
                res.redirect(`/gTutor/${user.id}`);
              })
            } else {
              req.session.message = "Invalid username or password. Please try again.";
              req.session.save((err) => {
                res.redirect('/gTutor');
              })
            }
          })
      })
      .catch((err) => {
        console.log(err);
      })
  },

  register: function(req,res) {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      type: req.body.type,
      password: req.body.password,
      cohort: req.body.cohort,
      campus: req.body.campus
    }

    encryption.hash(newUser)
      .then((user) => {
        knex('users')
          .insert(user, '*')
          .then((addedUser) => {
            console.log(addedUser);
            req.session.id = addedUser.id;
            req.session.save((err) => {
              res.redirect(`/gTutor/${addedUser[0].id}`);
            })
          })
      })
      .catch((err) => {
        console.log(err);
      })
  },

  request: function(req,res){
    res.render("requestQ")
  },

  dashboard: function(req, res){
    res.render('b_loggedin', {sessionID: req.session.user});
  }
}
