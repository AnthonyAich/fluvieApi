const { tables, getKnex } = require("../data");

/**
 * Checks if a given route is valid
 *
 * @param {array} RouteArr
 * @returns boolean
 */
const validateRoute = async (category, headGoal, subgoals) => {
    if (category === "") return true;
    const sdgIds = (await getKnex()(tables.SDG)
        .select(`${tables.SDG}.id`)
        .join(tables.Category, `${tables.SDG}.categoryId`, `${tables.Category}.id`)
        .where(`${tables.Category}.name`, category))
        .map(e => e.id);
    if (!sdgIds || sdgIds.length === 0) return false;
    if (headGoal === undefined && subgoals.length === 0) return true;

    const headgoalId = await getKnex()(tables.Goal)
        .select(`${tables.Goal}.id`)
        .whereIn("sdgId", sdgIds)
        .and.where("name", headGoal)
        .and.where("parentId", null)
        .first();
    if (!headgoalId) return false;

    let validation = true;
    await subgoals.reduce(async (parentId, goalName, index) => {
        const response = await getKnex()(tables.Goal)
            .select(`${tables.Goal}.id`)
            .and.where("name", goalName)
            .and.where("parentId", await parentId)
            .first();
        if (!response || response?.id === null) validation = false;
        return response?.id;
    }, headgoalId?.id);

    return validation;
};

module.exports = { validateRoute };
