const { tables } = require("..");

/**
 * This creates a table named sdg
 *
 * up: table with an id id, an integer goal, an id categoryId, a field title, a field short, a field colorInfo, a field iconUrl and an integer parent
 * down: the table is dropped, so nothing remains
 */
module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.SDG, (table) => {
      table.integer("goal").unique();

      table.string("id").primary();

      table.string("categoryId");
      table
        .foreign("categoryId")
        .references(`${tables.Category}.id`)
        .onDelete("CASCADE");

      table.string("description", 1024);
      table.string("title");
      table.string("color");
      table.string("url");

      table.integer("parent");
      table
        .foreign("parent")
        .references(`${tables.SDG}.goal`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    return await knex.schema.dropIfExists(tables.SDG);
  },
};
