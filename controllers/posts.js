const knex = require("../db/knex.js");

module.exports = {
  getAll: function(req, res) {
      knex('users')
        .where('users.id', req.session.user)
        .then((user) => {
          knex('posts')
            .select('posts.id AS posts.id', 'user_id', 'posts.topic', 'posts.title', 'posts.content', 'posts.status', 'posts.created_at', 'users.first_name', 'users.last_name', 'users.email', 'users.campus', 'users.cohort', 'users.type')
            .join('users', 'users.id', 'posts.user_id')
            .orderBy('posts.id', 'DESC')
            .then((postsList) => {
              knex('helpers')
                .then((allHelps) => {
                  knex('messages')
                    .select('messages.id', 'messages.helper_id', 'messages.user_id', 'messages.message', 'users.first_name', 'users.last_name', 'users.cohort', 'users.type', 'helpers.post_id', 'helpers.status')
                    .join('users', 'users.id', 'messages.user_id')
                    .join('helpers', 'helpers.id', 'messages.helper_id')
                    .then((allMessages) => {
                      let messagesReceived = [];

                      let userPosts = postsList.filter(posts => posts.user_id == req.session.user);


                      let helpsOffered = userPosts.filter(posts => posts.status === "PENDING");

                      // console.log('helpsOffered', helpsOffered);

                      if (helpsOffered[0]) {
                        let helpID = allHelps.filter((helpers) => helpers.post_id === helpsOffered[0]["posts.id"])

                          for (var i = 0; i < helpID.length; i++) {
                            let thisArr = allMessages.filter(messages => messages.helper_id === helpID[i].id);
                            messagesReceived = messagesReceived.concat(thisArr);
                            console.log("thisArr", thisArr)
                          }
                          // let messagesReceived = allMessages.filter(messages => helpID.indexOf(messages.helper_id) > -1);

                        }

                      console.log('messagesReceived', messagesReceived);

                      let helpsReceived = userPosts.filter(posts => posts.status === "CLOSED");
                      let helperInfo = "";

                      console.log("helpsReceived", helpsReceived);

                      if (helpsReceived[0]) {
                        let acceptedHelp = allHelps.filter((helpers) => helpers.status === "ACCEPTED")

                        helperInfo = allMessages.filter(message => message.helper_id === acceptedHelp[0].id)

                        console.log("helperInfo", helperInfo);
                      }

                      let messagesSent = [];
                      let postsOfferedHelp = [];

                      let messagesSentHelpID = allHelps.filter(helpers => helpers.user_id === req.session.user);

                      if (messagesSentHelpID[0]) {
                        messagesSent = allMessages.filter(messages => messages.helper_id === messagesSentHelpID[0].id);

                        postsOfferedHelp = postsList.filter(posts => posts["posts.id"] === messagesSentHelpID[0].post_id);

                        console.log("postsOfferedHelp", postsOfferedHelp)

                      }

                      console.log("messagesSentHelpID", messagesSentHelpID);

                      console.log('messagesSent', messagesSent);

                      // res.render('b_newPostForm', {posts: postsList, userName: user[0].first_name, personalPosts: userPosts, helps: allHelps, loggedUserID: req.session.user, messages: messagesReceived, offeredHelp: postsOfferedHelp, sentMessages: messagesSent});
                      res.render('requestDashboard', {posts: postsList, userName: user[0].first_name, personalPosts: userPosts, helps: allHelps, loggedUserID: req.session.user, messages: messagesReceived, offeredHelp: postsOfferedHelp, sentMessages: messagesSent, helper: helperInfo, userInfo: user[0]});
                    })
                })
            })
            .catch((err) => {
              console.log(err);
            });
        })
  },

  createOne: function(req, res) {
    knex('posts')
      .then((allPosts) => {
        let userHasPost = allPosts.filter(post => post.user_id == req.session.user);

        if (userHasPost[0]) {
          res.send('Sorry, you can only have one post at a time')
        } else {
            let newPost = {
              user_id: Number(req.session.user),
              topic: req.body.topic,
              title: req.body.title,
              content: req.body.content
            }
            knex('posts')
              .insert(newPost, '*')
              .then((post) => {
                console.log(post);
                res.redirect(`/gTutor/posts`)
              })
              .catch((err) => {
                console.log(err);
              })
          }
      })
  },

  getOne: function(req, res) {
    knex('posts')
      .where('id', req.params.postID)
      .then((result) => {
        res.render('b_requestForm', {post: result[0]});
      })
      .catch((err) => {
        console.log(err);
      })
  },

  update: function(req, res) {

    let updatedPost = {
      title: req.body.title,
      topic: req.body.topic,
      content: req.body.content
    };

    knex('posts')
      .update(updatedPost, '*')
      .where('id', req.params.postID)
      .then((result) => {
        res.redirect('/gTutor/posts');
      })
      .catch((err) => {
        console.log(err);
      })
  },

  delete: function(req, res) {
    console.log('delete');
    knex('posts')
      .where('id', req.params.postID)
      .del()
      .then((deletedPost) => {
        console.log(deletedPost);
        res.redirect('/gTutor/posts');
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
