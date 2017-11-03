const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    console.log('requestOffer - foundPost:', req.params.postID);
      knex('posts')
        .select('posts.id', 'posts.topic', 'posts.content', 'posts.title', 'users.first_name', 'users.last_name', 'users.type', 'users.cohort')
        .join('users', 'users.id', 'posts.user_id')
        .where('posts.id', req.params.postID)
        .then((foundPost) => {
            knex('users')
              .where('users.id', req.session.user)
              .then((loggedUser) => {
                let currentUser = "";
                if (req.session.user) {
                  currentUser = req.session.user;
                }
                res.render('requestOffer', {post: foundPost[0], user: loggedUser[0], userInfo: currentUser});
              });
        })
        .catch((err) => {
          console.log(err);
        })
  },

    createOne: function(req, res) {
      console.log("req.body", req.body);
      console.log("req.params", req.params.postID);
      let newHelp = {
        post_id: Number(req.params.postID),
        user_id: Number(req.session.user)
      }
      knex('posts')
        .update({status: 'PENDING'})
        .where('posts.id', req.params.postID)
        .then((result) => {
          console.log("result", result);
          knex('helpers')
            .insert(newHelp, '*')
            .then((newEntry) => {
              console.log("ERROR");
              let newMessage = {
                helper_id: newEntry[0].id,
                user_id: Number(req.session.user),
                message: req.body.message
              }
              knex('messages')
                .insert(newMessage, '*')
                .then((addedMessage) => {
                  console.log(addedMessage);
                  res.redirect(`/gTutor/posts`);
                })
            })
        })
        .catch((err) => {
          console.log(err);
        })
    },
    action: function(req, res) {
      if (req.params.action === "accept") {
        knex('helpers')
          .where('id', req.params.helpID)
          .then((help) => {
            knex('helpers')
              .update({status: "ACCEPTED"})
              .where('id', req.params.helpID)
              .then(() => {
                knex('helpers')
                .update({status: "REJECTED"})
                .whereNot('id', req.params.helpID)
                .then(() => {
                  knex('posts')
                    .update({status: "CLOSED"})
                    .where('id', help[0].post_id)
                    .then(() => {
                      res.redirect('/gTutor/posts');
                    })
                })
              })
          })
          .catch((err) => {
            console.log(err);
          })

      } else {
        knex('helpers')
          .update({status: "REJECTED"})
          .where('id', req.params.helpID)
          .then(() => {
            res.redirect('/gTutor/posts');
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
}
