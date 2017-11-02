
exports.up = function(knex, Promise) {
  return knex.schema.createTable('helpers', (table) => {
    table.increments();
    table.integer('post_id')
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('status')
      .notNullable()
      .defaultTo('PENDING REVIEW');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('helpers');
};
