const { tables, getKnex } = require("../data");

const getTemplate = async (userId) => {
  const template = await getKnex()(tables.User)
    .where({ userId: userId })
    .join(
      `${tables.Role}`,
      `${tables.User}.roleId`,
      "=",
      `${tables.Role}.roleId`
    )
    .join(
      `${tables.Template}`,
      `${tables.Role}.templateId`,
      "=",
      `${tables.Template}.templateId`
    )
    .first();
  if (!template) throw Error;
  return template.templateData;
};

module.exports = {
  getTemplate,
};
