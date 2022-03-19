const { tables } = require("..");

/**
 * This creates a table named externaluser
 *
 * up: table with an id externalUserId, an id roleId, a field username and a json field personalizedTemplateData
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.ExternalUser, (table) => {
      table.uuid("id").notNullable().primary();

      table.uuid("roleId").notNullable();
      table
        .foreign("roleId")
        .references(`${tables.Role}.id`)
        .onDelete("CASCADE");
      table.string("username", 255).notNullable();
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.ExternalUser);
  },
};
