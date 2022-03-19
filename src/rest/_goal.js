const Router = require("@koa/router");
const goalService = require("../service/goal");
const Joi = require("joi");
const validate = require("./_validation.js");
const { decode } = require("jsonwebtoken");
const { makeBannedRole, makeRequireRole, requireAuthentication } = require("../core/auth");
const Role = require("../core/roles")
/**
 * Finds and returns the goals in the database with the given parent
 */
const getGoalBySDGname = async (ctx) => {
  ctx.body = await goalService.getGoalBySDGparentName(ctx.request.params.name, decode(ctx.headers.authorization.substr(7)).userId);
};
getGoalBySDGname.validationScheme = {
  params: {
    name: Joi.string(),
  },
};
/**
 * Finds the goals with the given category name
 */
const getGoalsBycategoryname = async (ctx) => {
  ctx.body = await goalService.getGoalsBycategoryname(ctx.request.params.name, decode(ctx.headers.authorization.substr(7)).userId);
};
getGoalsBycategoryname.validationScheme = {
  params: {
    name: Joi.string(),
  },
};

const getGoalsByCategoryAndRole = async (ctx) => {
  ctx.body = await goalService.getGoalsByCategoryAndRole(
    ctx.request.params.roleId, 
    ctx.request.params.category
  );
};
getGoalsByCategoryAndRole.validationScheme = {
  params: {
    roleId: Joi.string().uuid(),
    category: Joi.string()
  }
}

const getGoalsByParentAndRole = async (ctx) => {
  ctx.body = await goalService.getGoalsByParentAndRole(
    ctx.request.params.roleId,
    ctx.request.params.parent
  )
}
getGoalsByParentAndRole.validationScheme = {
  params: {
    roleId: Joi.string().uuid(),
    parent: Joi.string()
  }
}

module.exports = (app) => {
  const router = new Router({ prefix: "/goal" });

  router.get("/children/:name", requireAuthentication, makeBannedRole(Role.User), validate(getGoalBySDGname.validationScheme), getGoalBySDGname);
  router.get("/category/:name", requireAuthentication, validate(getGoalsBycategoryname.validationScheme), getGoalsBycategoryname);
  router.get(
    "/roles/:roleId/:category",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(getGoalsByCategoryAndRole.validationScheme),
    getGoalsByCategoryAndRole
  );
  router.get(
    "/parents/:roleId/:parent",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(getGoalsByParentAndRole.validationScheme),
    getGoalsByParentAndRole
  )

  app.use(router.routes()).use(router.allowedMethods());
};
