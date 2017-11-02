const knex = require("../db/knex.js");

module.exports = {
  getAll: function(req, res) {
    knex('posts')
      .join('users', 'users.id', 'posts.user_id')
      .orderBy('posts.id', 'DESC')
      .whereNot('posts.status', 'CLOSED')
      .then((postsList) => {
        knex('helpers')
          .then((allHelps) => {
            let user = req.session.user;

            let userPosts = postsList.filter(posts => posts.id == req.params.id);
            res.render('requestQ', {posts: postsList, userName: user, personalPosts: userPosts, helps: allHelps, loggedUserID: req.params.id});
          })

      })
      .catch((err) => {
        console.log(err);
      });
  },

  createOne: function(req, res) {
    let newPost = {
      user_id: req.params.id,
      topic: req.body.topic,
      title: req.body.title,
      content: req.body.content
    }

    console.log(newPost);
    knex('posts')
      .insert(newPost, '*')
      .then((post) => {
        console.log(post);
        res.redirect(`/gTutor/${req.params.id}`)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
