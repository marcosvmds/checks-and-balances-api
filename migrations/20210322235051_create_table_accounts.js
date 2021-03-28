
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table=>{
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull().unique()
        table.decimal('balance', 10, 2).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('accounts')
};
