const { tables, getKnex } = require("../data");

const help = async (name, userId, parent, value) => {
  return await getKnex()(tables.Goal)
    .select(
      `${tables.Goal}.id`,
      `${tables.Goal}.name`,
      `${tables.Goal}.currentValue`,
      `${tables.Goal}.targetValue`,
      `${tables.Goal}.weight`,
      `${tables.Goal}.sdgId`,
      `${tables.Goal}.subSdgId`,
      `${tables.Goal}.parentId`,
      `${tables.SDG}.title`,
      `${tables.Category}.color`,
      `${tables.SDG}.url`,
      getKnex().raw(`COALESCE(${tables.PersonalTemplate}.interested,1) as interested`),
    )
    .leftJoin(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .leftJoin(
      tables.PersonalTemplate,
      `${tables.PersonalTemplate}.templateGoalId`,
      `${tables.TemplateGoal}.id`
    )
    .leftJoin(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .leftJoin(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(
      `${tables.TemplateGoal}.templateId`,
      getKnex()(tables.Template)
        .select("id")
        .where("roleId", userId)
    )
    .and.where(`${tables.Goal}.parentId`, parent)
    .and.where(`${tables.TemplateGoal}.canView`, true)
    .and.where(value, name)
}

/**
 * Finds and returns the goals in the database with the given parent
 */
const findGoalBySDGparentName = async (name, userId) => {
  return await help(
    1,
    userId,
    getKnex()(tables.Goal)
      .select("id")
      .where("name", name),
    1
  );
};

const findGoalByCategoryname = async (name, userId) => {
  return await help(name, userId, null, `${tables.Category}.name`);
};

const findGoalsByCategoryAndRole = async (roleId, category, id) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.TemplateGoal}.id`)
    .join(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .join(
      tables.Template,
      `${tables.Template}.id`,
      `${tables.TemplateGoal}.templateId`
    )
    .join(
      tables.Role,
      `${tables.Template}.roleId`,
      `${tables.Role}.id`
    )
    .join(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .join(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(`${tables.Role}.id`, roleId)
    .where(`${tables.Category}.name`, category)
    .where(`${tables.Goal}.id`, id)
    .where(`${tables.TemplateGoal}.canView`, true);
}

const findGoalsByCategory = async (category) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.Goal}.*`, `${tables.SDG}.url`)
    .join(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .join(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(`${tables.Category}.name`, category);
}

const findGoalsByParentAndRole = async (roleId, name, id) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.TemplateGoal}.id`)
    .join(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .join(
      tables.Template,
      `${tables.Template}.id`,
      `${tables.TemplateGoal}.templateId`
    )
    .join(
      tables.Role,
      `${tables.Template}.roleId`,
      `${tables.Role}.id`
    )
    .where(`${tables.Role}.id`, roleId)
    .where(`${tables.Goal}.id`, id)
    .where(
      `${tables.Goal}.parentId`,
      getKnex()(tables.Goal).select("id")
        .where("name", name)
    )
    .where(`${tables.TemplateGoal}.canView`, true);
}

const findGoalsByParent = async (name) => {
  return await getKnex()(tables.Goal)
    .select()
    .where(
      `parentId`,
      getKnex()(tables.Goal).select("id")
        .where("name", name)
    );
}

const findUser = async (userId) => {
  return await getKnex()(tables.User).select("roleId").where("id", userId);
}

const findFool = async () => {
  return await getKnex()(tables.Role).select("id").where("name", "User");
}

module.exports = {
  findGoalBySDGparentName,
  findGoalByCategoryname,
  findGoalsByCategoryAndRole,
  findGoalsByCategory,
  findGoalsByParentAndRole,
  findGoalsByParent,
  findUser,
  findFool
};
