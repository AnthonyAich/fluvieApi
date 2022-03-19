const { tables, getKnex } = require("../data");

/**
 * Finds and returns all categories in the database
 *
 * @returns [...category]
 */
const findAllCategories = async () => {
  return await getKnex()(tables.Category).select("id", "color", "name");
};

const findSDGsByCategory = async (categoryId) => {
  return await getKnex()(tables.SDG)
    .select("id", "url", "title")
    .where(`${tables.SDG}.categoryId`, categoryId)
    .orderBy(`${tables.SDG}.goal`)
}

module.exports = {
  findAllCategories,
  findSDGsByCategory
};
