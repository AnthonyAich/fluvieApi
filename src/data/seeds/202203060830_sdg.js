const { tables } = require("..");
const sdgData = require("../sdgData.json");

/**
 * Fills the table sdg
 *
 * @see /migrations/202223021601_createSdg.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.SDG).delete();
    await knex(tables.SDG).insert(sdgData);
  },
};
