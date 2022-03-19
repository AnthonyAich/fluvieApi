const { tables } = require("..");

/**
 * Fills the table sdgvaluehistory
 *
 * @see /migrations/202223021604_createSDGvalueHistory.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.ValueHistory).delete();
    await knex(tables.ValueHistory).insert([
      //date 2022-03-06 09:00:00
      {
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        currentValue: 0,
        targetValue: 100,
        date: "2022-03-06 09:00:00",
      },
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 15,
        targetValue: 74,
        date: "2022-03-06 09:00:00",
      },
      //GOAL 3 (not optionally linked to a specific sub SDG)
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2022-03-06 09:00:00",
      },
      //SUB goals of goal 3
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 8,
        targetValue: 23,
        date: "2022-03-06 09:00:00",
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 14,
        targetValue: 43,
        date: "2022-03-06 09:00:00",
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 3,
        targetValue: 43,
        date: "2022-03-06 09:00:00",
      },
      //GOAL 17 (optionally linked to subSDG 17.2)
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2022-03-06 09:00:00",
      },
      //SUB GOALS of goal 17
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 43,
        targetValue: 78,
        date: "2022-03-06 09:00:00",
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 23,
        targetValue: 25,
        date: "2022-03-06 09:00:00",
      },
      //date 2022-01-05 10:00:00
      {
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        currentValue: 15,
        targetValue: 74,
        date: "2022-01-05 10:00:00",
      },
      //GOAL 3 (not optionally linked to a specific sub SDG)
      {
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        currentValue: null,
        targetValue: null,
        date: "2022-01-05 10:00:00",
      },
      //SUB goals of goal 3
      {
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        currentValue: 3,
        targetValue: 23,
        date: "2022-01-05 10:00:00",
      },
      {
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        currentValue: 9,
        targetValue: 43,
        date: "2022-01-05 10:00:00",
      },
      {
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        currentValue: 1,
        targetValue: 39,
        date: "2022-01-05 10:00:00",
      },
      //GOAL 17 (optionally linked to subSDG 17.2)
      {
        goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        currentValue: null,
        targetValue: null,
        date: "2022-01-05 10:00:00",
      },
      //SUB GOALS of goal 17
      {
        goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
        currentValue: 33,
        targetValue: 78,
        date: "2022-01-05 10:00:00",
      },
      {
        goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        currentValue: 16,
        targetValue: 20,
        date: "2022-01-05 10:00:00",
      },
    ]);
  },
};
