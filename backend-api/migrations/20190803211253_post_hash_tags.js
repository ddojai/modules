const table = 'post_hash_tags'

exports.up = function(knex) {
  return knex.schema
    .createTable(table, table => {
      table.bigIncrements('id').primary()
      table.bigInteger('postId').notNullable()
      table.bigInteger('hashTagId').notNullable()
      table.unique(['postId', 'hashTagId'])
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists(table)
};
