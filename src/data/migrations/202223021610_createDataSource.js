const { tables } = require("..");

/**
 * This creates a table named datasource
 *
 * up: table with an id dataSourceId, an id SDGgoalId a field data
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.DataSource, (table) => {
      table.uuid("id").primary();
      table.uuid("goalId");
      table.foreign("goalId").references(`${tables.Goal}.id`).onDelete("CASCADE");
      table.string("data", 5000);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.DataSource);
  },
};
