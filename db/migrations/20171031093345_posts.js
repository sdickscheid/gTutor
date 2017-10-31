
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .index();
    table.string('topic');
    table.string('title');
    table.string('status')
      .notNullable()
      .defaultTo('OPEN');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
