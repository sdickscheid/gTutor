
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, topic: "JavaScript", title: "Help with Accumulator Patterns", content: "Struggling with understanding and implementing accumulator patterns and iterating over arrays. I am available to meet this Friday (11/3) at 5pm. Please message me if you are available to help. Thanks!"}
      ]);
    });
};
