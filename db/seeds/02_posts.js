
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, topic: "JavaScript", title: "Help with Accumulator Patterns", content: "Struggling with understanding and implementing accumulator patterns and iterating over arrays. Please message me if you are available to help. Thanks!", day1: "10 November, 2017", day2: "12 November, 2017", time_start: "10:30AM", time_end: "03:00PM"}
      ]);
    });
};
