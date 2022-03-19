const { tables } = require("..");

/**
 * This creates a table named user
 *
 * up: table with an id userId, an id roleId, a field username, a field passwordhash, a field email and a json field personalizedTemplateData
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.User, (table) => {
      table.uuid("id").notNullable().primary();

      table.uuid("roleId").notNullable();
      table
        .foreign("roleId")
        .references(`${tables.Role}.id`)
        .onDelete("CASCADE");

      table.string("username", 255).notNullable();
      table.string("passwordhash").notNullable();
      table.string("email", 255);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.User);
  },
};
