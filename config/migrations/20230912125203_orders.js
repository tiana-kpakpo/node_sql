/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.string('customer_id').notNullable();
        table.integer('price').notNullable();
        table.string('product').notNullable();
        table.timestamps(true, true);

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders')
  
};
