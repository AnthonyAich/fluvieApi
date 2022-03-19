const goalRepository = require("../repository/goal");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("goal-service");
  this.logger.debug(message, meta);
};

/**
 * Finds and returns the goals in the database with the given SDGId
 */
const getGoalBySDGparentName = async (name, userId) => {
  try {
    debugLog(`Fetching all goals with SDG-name: ${name} ${userId}`);
    try {
      const roleId = await goalRepository.findUser(userId);
      return await goalRepository.findGoalBySDGparentName(name, roleId[0].roleId);
    } catch (error) {
      const roleId = await goalRepository.findFool();
      return goalRepository.findGoalBySDGparentName(name, roleId[0].id);
    }
  } catch (error) {
    throw Error(`Error occurred while fetching all goals with SDG-name: ${name}`);
  }
};

/**
 * Finds and returns the goals in the database from the category with the given name
 */
const getGoalsBycategoryname = async (name, userId) => {
  try {
    debugLog(`Fetching goals from category with name ${name}`);
    //return await goalRepository.findGoalByCategoryname(name, userId);
    try {
      const roleId = await goalRepository.findUser(userId);
      return await goalRepository.findGoalByCategoryname(name, roleId[0].roleId);
    } catch (error) {
      const roleId = await goalRepository.findFool();
      return await goalRepository.findGoalByCategoryname(name, roleId[0].id);
    }
  } catch (error) {
    throw Error(
      `Error occurred while fetching goals from category with name ${name}`
    );
  }
}

const getGoalsByCategoryAndRole = async (id, category) => {
  try {
    debugLog(`Fetching goals from category with name ${category} with roleId ${id}`);
    const data = await goalRepository.findGoalsByCategory(category);
    const mappedData = await Promise.all(
      data.map(async (d) => {
        const options = await goalRepository.findGoalsByCategoryAndRole(id, category, d.id);

        try {
          if (options[0].id) d.visible = 1
          else d.visible = 0
          return d;
        } catch (error) {
          d.visible = 0
          return d
        }
      })
    )
    return mappedData
  } catch (error) {
    throw Error(`Error occured while fetching goals with category ${category} for role ${id}`);
  }
}

const getGoalsByParentAndRole = async (id, name) => {
  try {
    debugLog(`Fetching goals from parent with name ${name} with roleId ${id}`);
    const data = await goalRepository.findGoalsByParent(name);
    const mappedData = await Promise.all(
      data.map(async (d) => {
        const options = await goalRepository.findGoalsByParentAndRole(id, name, d.id);

        try {
          if (options[0].id) d.visible = 1
          else d.visible = 0
          return d;
        } catch (error) {
          d.visible = 0
          return d
        }
      })
    )
    return mappedData
  } catch (error) {
    throw Error(`Error occured while fetching goals with parent ${name} for role ${id}`);
  }
}

module.exports = {
  getGoalBySDGparentName,
  getGoalsBycategoryname,
  getGoalsByCategoryAndRole,
  getGoalsByParentAndRole
};
