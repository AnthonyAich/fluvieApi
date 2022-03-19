const externalUserRepository = require("../repository/externalUser");
const { generateJWT } = require("../core/jwt");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("externalUser-service");
  this.logger.debug(message, meta);
};

/**
 * Logs a user in by creating a token
 */
const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return { user: user, token };
};

/**
 * Logs an external user in
 */
const externalLogin = async (username) => {
  const errorMessage = "Given username is incorrect";

  const user = await externalUserRepository.findByExternalUsername(username);
  if (!user) {
    throw new Error(errorMessage);
  }

  debugLog(`External user ${username} has logged in`);
  return await makeLoginData(user);
};

/**
 * Finds and returns the external user in the database with the given externalUserId
 */
const getExternalUserByExternalUserId = async (externalUserId) => {
  try {
    debugLog(`Fetching external user with id ${externalUserId}`);
    return await externalUserRepository.findByExternalUserId(externalUserId);
  } catch (error) {
    throw Error(`Error occurred while fetching external user with id ${externalUserId}`);
  }
};

module.exports = {
  externalLogin,
  getExternalUserByExternalUserId,
};
