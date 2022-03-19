const { tables } = require("..");

/**
 * This creates a table named sdggoal
 *
 * up: table with an id SDGGoalId, an id sdgId, an id subSDGId, a field name, currentValue, targetValue, weight and an id parent
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.Goal, (table) => {
      table.uuid("id").primary();

      table.string("name", 255);
      table.integer("currentValue");
      table.integer("targetValue");
      table.integer("weight");

      table.string("sdgId");
      table
        .foreign("sdgId")
        .references(`${tables.SDG}.id`)
        .onDelete("CASCADE");

      table.string("subSdgId");
      table
        .foreign("subSdgId")
        .references(`${tables.SDG}.id`)
        .onDelete("CASCADE");

      table.uuid("parentId");
      table
        .foreign("parentId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.Goal);
  },
};
