const Router = require("@koa/router");
const userService = require("../service/user");
const Joi = require("joi");
const validate = require("./_validation.js");
const Role = require("../core/roles");
const { requireAuthentication, makeRequireRole } = require("../core/auth");

/**
 * Logs a user in
 */
const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const response = await userService.login(username, password);
  ctx.body = response;
};
login.validationScheme = {
  body: {
    username: Joi.string().min(4).max(255),
    password: Joi.string().min(4).max(255),
  },
};

/**
 * Finds and returns the user in the database with the given userId
 */
const getUserByUserId = async (ctx) => {
  ctx.body = await userService.getUserByUserId(ctx.params.userId);
};
getUserByUserId.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/user", });

  const requireMVO = makeRequireRole(Role.MVOcoördinator);
  router.post("/login", validate(login.validationScheme), login);
  router.get("/:userId", requireAuthentication, validate(getUserByUserId.validationScheme), getUserByUserId);

  app.use(router.routes()).use(router.allowedMethods());
};
