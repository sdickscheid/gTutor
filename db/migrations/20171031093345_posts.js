
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('topic');
    table.string('title');
    table.text('content');
    table.string('status')
      .notNullable()
      .defaultTo('OPEN');
    table.string('day1');
    table.string('day2');
    table.string('time_start');
    table.string('time_end');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
