const { tables } = require("..");
const indicatorData = require("../indicatorData.json");
/**
 * Fills the table indicator
 *
 * @see /migrations/202223021602_createIndicators.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Indicator).delete();
    await knex(tables.Indicator).insert(indicatorData);
  },
};
