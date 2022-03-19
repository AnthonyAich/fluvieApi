const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  await getKnex()(tables.Category).delete();
  await getKnex()(tables.SDG).delete();
  await getKnex()(tables.DataSource).delete();
  await getKnex()(tables.User).delete();
  await getKnex()(tables.Role).delete();
  await getKnex()(tables.Template).delete();
  await getKnex()(tables.ExternalUser).delete();
  await getKnex()(tables.ValueHistory).delete();
  await getKnex()(tables.Goal).delete();
  await getKnex()(tables.Indicator).delete();
  await getKnex()(tables.PersonalTemplate).delete();
  await getKnex()(tables.Template).delete();

  await shutdownData();
};
