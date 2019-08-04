const table = 'posts'

  exports.up = function(knex) {
  return knex.schema
    .createTable(table, table => {
      table.bigIncrements('id').primary()
      table.string('title').notNullable()
      table.string('body').notNullable()
      table.dateTime('publishedDate').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists(table)
};
