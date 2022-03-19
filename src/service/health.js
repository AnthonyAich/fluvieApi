const packageJson = require('../../package.json');
const healthRepository = require("../repository/health");

const ServiceError = require("../core/serviceError");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("health-service");
    this.logger.debug(message, meta);
};

/**
 * returns if a response reaches the server and the time it recieved the request
 */
const ping = () => {
    try {
        debugLog(`pinging the server`);
        return { response: true, TimeReceived: new Date().getTime() };
    } catch (error) {
        throw Error(`error occurred while pinging the server`);
    }
};

/**
 * returns the version and the environment
 */
const getVersion = () => {
    try {
        debugLog(`fetching the version`);
        return { environment: process.env.NODE_ENV, version: packageJson.version, }
    } catch (error) {
        throw Error(`error occurred while fetching the version`);
    }
};

/**
 * returns if a route is valid or not
 */
const validateRoute = async (RouteArr) => {
    try {
        debugLog(`checking the route ${RouteArr.join("/")}`);
        return await healthRepository.validateRoute(RouteArr[0], RouteArr[1], RouteArr.slice(2));
    } catch (error) {
        throw Error(`error occurred while checking the route ${RouteArr.join("/")}`);
    }
};

module.exports = {
    ping,
    getVersion,
    validateRoute
};