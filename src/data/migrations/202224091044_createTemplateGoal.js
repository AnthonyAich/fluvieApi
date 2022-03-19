const { tables } = require("..");

/**
 * This creates a table named templategoal
 *
 * up: table with an id templateGoalId, id SDGGoalId and a boolean canView
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.TemplateGoal, (table) => {
      table.uuid("id").notNullable().primary();

      table.uuid("templateId").notNullable();
      table
        .foreign("templateId")
        .references(`${tables.Template}.id`)
        .onDelete("CASCADE");

      table.uuid("goalId").notNullable();
      table
        .foreign("goalId")
        .references(`${tables.Goal}.id`)
        .onDelete("CASCADE");

      table.unique(["templateId", "goalId"]);

      table.boolean("canView").defaultTo(false);
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.TemplateGoal);
  },
};
