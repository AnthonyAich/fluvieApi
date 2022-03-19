const { tables } = require("..");

/**
 * This creates a table named indicators
 *
 * up: table with an id indicatorId, an id SDGId and two fields title and goal
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Indicator, (table) => {
      table.string("id").primary();
      table.string("sdgId");
      table
        .foreign("sdgId")
        .references(`${tables.SDG}.id`)
        .onDelete("CASCADE");
      table.string("content", 1024);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Indicator);
  },
};
