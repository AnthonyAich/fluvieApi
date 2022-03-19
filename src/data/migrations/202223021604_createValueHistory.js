const { tables } = require("..");

/**
 * This creates a table named sdgvaluehistory
 *
 * up: table with an id SDGgoalId, a dateTime date, and two fields currentValue and targetValue
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.ValueHistory, (table) => {
      table.integer("targetValue");
      table.integer("currentValue");

      table.dateTime("date");

      table.uuid("goalId");
      table
        .foreign("goalId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");

      table.primary(["goalId", "date"]);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.ValueHistory);
  },
};
