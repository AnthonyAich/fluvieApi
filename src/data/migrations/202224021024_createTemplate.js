const { tables } = require("..");

/**
 * This creates a table named template
 *
 * up: table with an id templateId, a field name
 * down: the table is dropped, so nothing remains
 */
module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.Template, (table) => {
            table.uuid("id").primary();
            table.uuid("roleId").notNullable().unique();
            table
                .foreign("roleId")
                .references(`${tables.Role}.id`)
                .onDelete("CASCADE");
        });
    },
    down: async (knex) => {
        return await knex.schema.dropIfExists(tables.Template);
    },
};
