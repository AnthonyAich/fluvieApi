const Router = require('@koa/router');
const Joi = require('joi');
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const healthService = require('../service/health');

const validate = require('./_validation');
/**
 * returns if a response reaches the server and the time it recieved the request
 */
const ping = async (ctx) => {
    ctx.body = healthService.ping();
};
ping.validationScheme = null;

/**
 * returns the version and the environment
 */
const getVersion = async (ctx) => {
    ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

/**
 * returns if a route is valid or not
 */
const validateRoute = async (ctx) => {
    let response = await healthService.validateRoute(ctx.request.body.data);
    ctx.body = response;
};
validateRoute.validationScheme = {
    body: {
        data: Joi.array().items(Joi.string().allow('')),
    }
};

module.exports = function installPlacesRoutes(app) {
    const router = new Router({ prefix: '/health' });

    router.get('/ping', validate(ping.validationScheme), ping);
    router.get('/version', validate(getVersion.validationScheme), getVersion);
    //fix route
    router.post('/validateroute', validate(validateRoute.validationScheme), validateRoute);

    app.use(router.routes()).use(router.allowedMethods());
};