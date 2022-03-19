const { tables } = require("..");

/**
 * Fills the table role
 *
 * @see \migrations\202224091045_createPersonalTemplate.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.PersonalTemplate).delete();
    await knex(tables.PersonalTemplate).insert([
      // MVO COÖRDINATOR (Ann.Onym)
      // MAIN ONE
      {
        userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
        templateGoalId: "9817158e-87b8-482d-85d6-b75004f5233a",
        interested: false,
      },
      // // MAIN TWO GOAL 1
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "cc6cd45c-0770-4118-9f84-49533c7a8479",
      //   interested: false,
      // },
      // // MAIN TWO GOAL 2
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "2481a633-26b2-48d1-88cf-d64eefd98e12",
      //   interested: false,
      // },
      // // MAIN THREE
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "9ab96845-6ac4-45a9-88db-8d09d6928784",
      //   interested: false,
      // },
      // SUB 1
      {
        userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
        templateGoalId: "e4562e47-8e99-4f4f-acce-2e3e89b60ca3",
        interested: false,
      },
      // // SUB 2
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "3aa789f5-95b4-483c-9074-df137b650d2a",
      //   interested: false,
      // },
      // // SUB 3
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "4d536086-c9fa-4cb0-9744-2699c3f4184c",
      //   interested: false,
      // },
      // //MAIN 17
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "142d6332-9f88-4b7b-a107-c8bc7e8eedc1",
      //   interested: false,
      // },
      // //SUB GOAL 1 OF MAIN 17
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "a90eb0d2-2d9e-4d4b-9135-39609716b5a6",
      //   interested: false,
      // },
      // //SUB GOAL 2 OF MAIN 17
      // {
      //   userId: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      //   templateGoalId: "54873d99-5e2b-42a9-8746-efeaa4626588",
      //   interested: false,
      // },




      // DIRECTEUR (Jack.Pott)
      // // MAIN ONE
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "f5ecce10-f810-4eab-8efc-dcaa15e7e1b6",
      //   interested: false,
      // },
      // // MAIN TWO GOAL 1
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "8efe1cfb-e242-45c1-8a31-f405315f5788",
      //   interested: false,
      // },
      // MAIN TWO GOAL 2
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "d386ddbb-1ba5-414a-af3c-9cd0a2bd034f",
      //   interested: false,
      // },
      // MAIN THREE
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "e3f35026-ae29-48ad-ab03-3282e5edc51f",
      //   interested: false,
      // },
      // // SUB 1
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "ea6fe4ab-4cea-4033-9905-7c00499c48d4",
      //   interested: false,
      // },
      // // SUB 2
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "ee0d6cd7-1ce3-46f1-8849-6ba786c8c3df",
      //   interested: false,
      // },
      // // SUB 3
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "9aabbb62-6f3c-4446-8803-4a218c1872e3",
      //   interested: false,
      // },

      // //MAIN 17
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "a90a8e23-9135-4598-95b8-2990e361545a",
      //   interested: false,
      // },
      // //SUB GOAL 1 OF MAIN 17
      // {
      //   userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      //   templateGoalId: "04fdd8e1-c626-4b1b-a617-0df267777296",
      //   interested: false,
      // },
      //SUB GOAL 2 OF MAIN 17
      {
        userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        templateGoalId: "6fb25fea-c60b-48cb-8a52-8125c1308d0a",
        interested: false,
      },
    ]);
  },
};
