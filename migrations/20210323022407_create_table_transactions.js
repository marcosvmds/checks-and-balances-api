exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary()
        table.integer('accountId').references('id')
            .inTable('accounts').notNull()
        table.string('type').notNull()
        table.date('date').notNull()
        table.decimal('amount',10,2).notNull()
        table.string('description', 40).notNull().defaultTo('')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions')
};
