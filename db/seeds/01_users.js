
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Bárbara', last_name: 'Doring', email: 'b@bs.com', password: 'abc', cohort: 'g66', campus: 'Phoenix'},
        {first_name: 'Hassan', last_name: 'Khan', email: 'h@ssan.com', password: '123', cohort: 'g58', campus: 'Denver'},
        {first_name: 'Scott', last_name: 'Dicksheid', email: 'scott@me.com', password: 'abc123', cohort: 'g60', campus: 'Seattle'}
      ]);
    });
};
