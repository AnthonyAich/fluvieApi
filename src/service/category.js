const categoryRepository = require("../repository/category");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("category-service");
  this.logger.debug(message, meta);
};

/**
 * Finds and returns all categories in the database
 */
const getAllCategories = async () => {
  try {
    debugLog(`Fetching all categories`);
    return await categoryRepository.findAllCategories();
  } catch (error) {
    throw Error(`Error occurred while fetching all categories`);
  }
};

/**
 * returns all the categories and their sdgs
 */
const getCategoriesAndSDGs = async () => {
  try { 
    debugLog(`Fetching categories with sdgs`);
    const data = await categoryRepository.findAllCategories();
    return await Promise.all(
      data.map(async (d) => {
        d.sdgs = await categoryRepository.findSDGsByCategory(d.id);
        return d;
      })
    );
  } catch (error) {
    throw Error(`Error occurred while fetching categories and sdgs`);
  }
}

module.exports = {
  getAllCategories,
  getCategoriesAndSDGs,
};
