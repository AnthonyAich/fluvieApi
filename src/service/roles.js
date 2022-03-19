const { getChildLogger } = require("../core/logging");
const roleRepository = require("../repository/roles");

// Role logger
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("roles-service");
  this.logger.debug(message, meta);
};
/**
 * returns all roles
 */
const getAllRoles = async () => {
  debugLog(`Fetching all roles`);
  const roleData = await roleRepository.findAllRoles();
  return roleData[0];
}

module.exports = {
  getAllRoles
}