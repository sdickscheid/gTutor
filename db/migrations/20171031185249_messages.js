
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.integer('helper_id')
      .references('id')
      .inTable('helpers')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.text('message');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
