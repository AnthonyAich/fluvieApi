const Router = require("@koa/router");

//const InstallSdgRoute = require("./_sdg");
const InstallCategoryRoute = require("./_category");
const InstallUserRoute = require("./_user");
const InstallTemplateRoute = require("./_template");
const InstallHealthRouter = require("./_health");
const InstallGoalRouter = require("./_goal");
const InstallRoles = require('./_roles');
const InstallExternalUserRouter = require('./_externalUser');

module.exports = (app) => {
  const router = new Router({ prefix: "/api", });


  //InstallSdgRoute(router);
  InstallCategoryRoute(router);
  InstallUserRoute(router);
  InstallTemplateRoute(router);
  InstallHealthRouter(router);
  InstallGoalRouter(router);
  InstallRoles(router);
  InstallExternalUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};