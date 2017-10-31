
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('cohort')
      .notNullable()
      .defaultTo('');
    table.string('campus');
    table.string('type');
    table.string('role')
      .notNullable()
      .defaultTo('user');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
