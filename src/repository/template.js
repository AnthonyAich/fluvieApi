const { tables, getKnex } = require("../data");
const uuid = require("uuid");

/**
 * creates a template for the given roleId
 */
const addTemplate = async ({ roleId }) => {
  await getKnex()(tables.Template)
    .insert({ id: uuid.v4(), roleId })
    .onConflict()
    .ignore();
};

/**
 * deletes the template with the given templateId
 */
const deleteTemplate = async (id) => {
  await getKnex()(tables.Template).where("id", id).del();
};

/**
 * edits a template with the give templateId, goalId and flag
 */
const editTemplate = async ({ templateId, goalId, flag: canView }) => {
  let rolename = (
    await getKnex()(tables.Role)
      .select("name")
      .join(tables.Template, `${tables.Template}.roleId`, `${tables.Role}.id`)
      .where(`${tables.Template}.id`, templateId)
      .first()
  ).name;
  if (rolename === "MVO Coördinator") {
    return { "message": "Can't edit MVO Coördinator's template" };
  }
  let success = await getKnex()(tables.TemplateGoal)
    .update({
      canView: canView
    }).where({
      templateId: templateId,
      goalId: goalId,
    });
  if (success !== 1) {
    success = await getKnex()(tables.TemplateGoal)
      .insert({
        id: uuid.v4(),
        templateId: templateId,
        goalId: goalId,
        canView: canView
      })
      .onConflict()
      .merge();
  }
  if (success === 1 || success[0] === 0) {
    return { "message": "Template has successfully been edited" };
  }
  return { "message": "The template has failed to edit" }
};

/**
 * Deletes a template with the template id
 */
const editPersonalTemplate = async ({ goalId, flag: interested, userId }) => {
  if (interested) {
    await getKnex()(tables.PersonalTemplate)
      .where({
        templateGoalId: getTemplateGoalId(goalId, userId),
        userId: userId
      })
      .del();
    return;
  }

  await getKnex()(tables.PersonalTemplate)
    .insert({
      templateGoalId: getTemplateGoalId(goalId, userId),
      userId: userId,
      interested: interested
    })
    .onConflict()
    .merge();
};

const getTemplateGoalId = (goalId, userId) => {
  return getKnex()(tables.TemplateGoal)
    .select(`${tables.TemplateGoal}.id`)
    .join(tables.Goal, `${tables.TemplateGoal}.goalId`, `${tables.Goal}.id`)
    .join(tables.Template, `${tables.TemplateGoal}.templateId`, `${tables.Template}.id`)
    .join(tables.Role, `${tables.Template}.roleId`, `${tables.Role}.id`)
    .join(tables.User, `${tables.Role}.id`, `${tables.User}.roleId`)
    .where(`${tables.User}.id`, userId).and.where(`${tables.Goal}.id`, goalId)
    .first()
}

module.exports = {
  addTemplate,
  deleteTemplate,
  editTemplate,
  editPersonalTemplate
};
