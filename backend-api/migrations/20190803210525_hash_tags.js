const table = 'hash_tags'

exports.up = function (knex) {
  return knex.schema
    .createTable(table, table => {
      table.bigIncrements('id').primary()
      table.string('title').notNullable()
      table.unique(['title'])
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(table)
};
