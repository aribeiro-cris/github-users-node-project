/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary(); // Primary key
    table.string('name').notNullable();
    table.string('location');
    table.integer('following').notNullable();
    table.integer('followers').notNullable(); 
    table.specificType('languages', 'TEXT[]');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('users');
};
