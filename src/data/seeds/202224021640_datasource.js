const { tables } = require("..");

/**
 * Fills the table datasource
 *
 * @see /migrations/202223021610_createDataSource.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.DataSource).delete();
    await knex(tables.DataSource).insert([
      //data for goals of sdg 1
      {
        id: "5fe22982-e817-424f-b9e6-c6073ad52ad0",
        goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
        data: "data of the goal of sdg 1",
      },
      //data for goals of sdg 2
      {
        id: "cfe793be-221b-4bdd-b620-a2b8115b70c1",
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        data: "data of the goal of sdg 2",
      },
      {
        id: "bc4caf27-46bf-401f-ad43-2b0fe5b5d23c",
        goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        data: "data of the goal 2 of sdg 2",
      },
      //data for goals of sdg 3
      {
        id: "7b4e5945-a900-40e3-b0be-8b698dc0b5d0",
        goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
        data: "data of the goal of sdg 3",
      },
      //data for sub goals of sdg 3
      {
        id: "6e1b9cb9-1169-49e2-abda-0f9a3a0aecdb",
        goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        data: "data of the sub goal 1 of the goal of sdg3",
      },
      {
        id: "3fa00560-7ffa-4524-8a93-6c33e226622e",
        goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
        data: "data of the sub goal 2 of the goal of sdg3",
      },
      {
        id: "b1d6155f-e97a-49f2-9913-cbd231c6e1fe",
        goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        data: "data of the sub goal 3 of the goal of sdg3",
      },
    ]);
  },
};
