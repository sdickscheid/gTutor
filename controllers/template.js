const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    res.render("login");
  },

  regis: function(req,res){
    res.render("registration")
  },

  requestQ: function(req,res){
    res.render("requestQ")
  }
}
