const Router = require("@koa/router");
const categoryService = require("../service/category");
const Joi = require("joi");
const validate = require("./_validation.js");

const { requireAuthentication, makeRequireRole } = require("../core/auth");

/**
 * Finds and returns all categories in the database
 */
const getAllCategories = async (ctx) => {
  ctx.body = await categoryService.getAllCategories();
};
getAllCategories.validationScheme = null;
/**
 * gets all the categories and there sdgs
 */
const getCategoriesAndSDGs = async (ctx) => {
  ctx.body = await categoryService.getCategoriesAndSDGs();
};
getCategoriesAndSDGs.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/category", });

  router.get("/", requireAuthentication, validate(getAllCategories.validationScheme), getAllCategories);
  router.get("/sdg", requireAuthentication, validate(getCategoriesAndSDGs.validationScheme), getCategoriesAndSDGs);

  app.use(router.routes()).use(router.allowedMethods());
};
