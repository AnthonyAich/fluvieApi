const { tables, getKnex } = require("../data");

/**
 * Finds and returns all the roles in the database
 *
 * @returns [...role]
 */
const findAllRoles = async () => {
  return await getKnex().raw(`
    SELECT r.id, r.color, r.name
    , (select id from template where roleId = r.id) as 'templateId'
    from role r
    WHERE name != 'MVO Coördinator'` 
  );
}

module.exports = { findAllRoles };
