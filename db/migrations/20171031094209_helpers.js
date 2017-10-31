
exports.up = function(knex, Promise) {
  return knex.schema.createTable('helpers', (table) => {
    table.increments();
    table.integer('post_id')
      .references('id')
      .inTable('posts')
      .index();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .index();
    table.timestamps(true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('helpers');
};
