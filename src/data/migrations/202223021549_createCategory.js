const { tables } = require("..");

/**
 * This creates a table named category
 *
 * up: table with an id categoryId, a field color and a field name
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Category, (table) => {
      table.uuid("id").primary();
      table.string("name", 255);
      table.string("color", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Category);
  },
};
