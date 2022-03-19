const Router = require("@koa/router");
const externalUserService = require("../service/externalUser");
const Joi = require("joi");
const validate = require("./_validation.js");

/**
 * Logs an external user in
 */
const externalLogin = async (ctx) => {
  const { username } = ctx.request.body;
  const response = await externalUserService.externalLogin(username);
  ctx.body = response;
};
externalLogin.validationScheme = {
  body: {
    username: Joi.string().min(4).max(255),
  },
};

/**
 * Finds and returns the external user in the database with the given externalUserId
 */
const getExternalUserByExternalUserId = async (ctx) => {
  ctx.body = await externalUserService.getExternalUserByExternalUserId(
    ctx.params.id
  );
};
getExternalUserByExternalUserId.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/externalUser" });

  router.post("/login", validate(externalLogin.validationScheme), externalLogin);
  router.get("/:id", validate(getExternalUserByExternalUserId.validationScheme), getExternalUserByExternalUserId);

  app.use(router.routes()).use(router.allowedMethods());
};
