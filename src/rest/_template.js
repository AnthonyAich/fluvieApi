const Router = require("@koa/router");
const templateService = require("../service/template");
const Joi = require("joi");
const validate = require("./_validation.js");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const roles = require("../core/roles");
const { decode } = require("jsonwebtoken");

/**
 * creates a template for the given roleId
 */
const createTemplate = async (ctx) => {
  ctx.body = await templateService.createTemplate({ ...ctx.request.body });
  return ctx.status = 201;
};
createTemplate.validationScheme = {
  body: {
    roleId: Joi.string().uuid(),
  }
}
/**
 * deletes the template with the given templateId
 */
const deleteTemplate = async (ctx) => {
  ctx.body = await templateService.deleteTemplate(ctx.params.id);
  return ctx.status = 200;
};
deleteTemplate.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  }
}

/**
 * edits a template with the give templateId, goalId and flag
 */
const editTemplate = async (ctx) => {
  ctx.body = await templateService.editTemplate(ctx.request.body);
  return ctx.status = 200;
};
editTemplate.validationScheme = {
  body: {
    templateId: Joi.string().uuid(),
    goalId: Joi.string().uuid(),
    flag: Joi.boolean()
  },
};

/**
 * edits a personal template for the user with the give goalId and flag
 */
const editPersonalTemplate = async (ctx) => {
  ctx.body = await templateService.editPersonalTemplate({ ...ctx.request.body, userId: decode(ctx.headers.authorization.substr(7)).userId });
  return ctx.status = 200;
};
editPersonalTemplate.validationScheme = {
  body: {
    goalId: Joi.string().uuid(),
    flag: Joi.boolean()
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/template" });
  router.post("/", requireAuthentication, makeRequireRole(roles.MVOcoördinator), validate(createTemplate.validationScheme), createTemplate);
  router.delete("/:id", requireAuthentication, makeRequireRole(roles.MVOcoördinator), validate(deleteTemplate.validationScheme), deleteTemplate);
  router.put("/", requireAuthentication, makeRequireRole(roles.MVOcoördinator), validate(editTemplate.validationScheme), editTemplate);
  router.put("/personal/", requireAuthentication, validate(editPersonalTemplate.validationScheme), editPersonalTemplate);

  app.use(router.routes()).use(router.allowedMethods());
};