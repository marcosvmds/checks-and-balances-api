
exports.up = function(knex) {
	return knex.schema.createTable('users', table =>{
		table.increments('id').primary()
		table.string('email').unique().notNull()
		table.string('name').notNull()
		table.string('password').notNull() 
		table.boolean('admin').notNull().defaultTo(false)
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('users')
};
