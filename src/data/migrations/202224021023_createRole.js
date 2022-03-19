const { tables } = require("..");

/**
 * This creates a table named role
 *
 * up: table with an id roleId, an id templateId and two fields, name and color
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Role, (table) => {
      table.uuid("id").notNullable().primary();
      table.string("name", 255).notNullable();
      table.string("color", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Role);
  },
};
