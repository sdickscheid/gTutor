const knex = require("../db/knex.js");
const encryption = require("../config/encryption.js");

module.exports = {
  redirect: function(req, res) {
    res.redirect('/gTutor');
  },

  index: function(req, res) {
    let user = "";
    if (req.session.user) {
      user = req.session.user;
    }
    res.render('index', {userInfo: user});
  },

  about: function(req, res){
    let user = "";
    if (req.session.user) {
      user = req.session.user;
    }
    res.render('about', {userInfo: user});
  },

  check: function(req, res) {
    let messageToPage = "";
    if (req.session.message) {
      messageToPage = req.session.message;
      req.session.message = "";
    }

    let user = "";
    if (req.session.user) {
      user = req.session.user;
    }

    res.render('loginPage', {message: messageToPage, userInfo: user});
  },

  login: function(req, res) {
    console.log(req.body)
    knex('users')
      .where('email', req.body.email)
      .then((encryptedUser) => {
        if (encryptedUser[0]) {
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
                  //change res.redirect(`/gTutor/${user.id}`);
                  res.redirect(`/gTutor/posts`);
                })
              } else {
                req.session.message = "Invalid username or password. Please try again.";
                req.session.save((err) => {
                  res.redirect('/gTutor/login');
                })
              }
            })
        } else {
          req.session.message = "Invalid username or password. Please try again.";
          req.session.save((err) => {
            res.redirect('/gTutor/login');
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },

  registrationPage: function(req, res) {
    res.render('registration');
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
            req.session.user = addedUser[0].id;
            req.session.save((err) => {
              //change res.redirect(`/gTutor/${addedUser[0].id}`);
              res.redirect(`/gTutor/login`);
            })
          })
      })
      .catch((err) => {
        console.log(err);
      })
  },

  logout: function(req, res) {
    req.session.user = "";
    req.session.save((err) => {
      if (err) throw err;
      res.redirect('/gTutor');
    })
  }

}
