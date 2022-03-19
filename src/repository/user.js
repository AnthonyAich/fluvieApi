const { tables, getKnex } = require("../data");

/**
 * Finds and returns the user in the database with the given username
 */
const findByUsername = async (username) => {
  return await getKnex()(tables.User)
    .select(`${tables.User}.id`, "username", "passwordhash", "email", "name as rolename")
    .join(tables.Role, `${tables.Role}.id`, "=", `${tables.User}.roleId`)
    .where("username", username).first();
};

/**
 * Finds and returns the user in the database with the given userId
 */
const findByUserId = async (userId) => {
  return await getKnex()(tables.User)
    .select(`${tables.User}.id`, "username", "email", "name as rolename")
    .join(tables.Role, `${tables.Role}.id`, "=", `${tables.User}.roleId`)
    .where(`${tables.User}.id`, userId).first();
};

module.exports = {
  findByUsername,
  findByUserId,
};
