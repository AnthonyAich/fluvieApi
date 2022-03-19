const { tables } = require("..");

/**
 * Fills the table sdggoal
 *
 * @see /migrations/2202223021603_createSDGgoal.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.Goal).delete();
    await knex(tables.Goal).insert([
      //sdg goal 1
      {
        id: "6e8c05ef-131b-47b7-8369-dff051204608",
        name: "Sociale Zekerheid",
        currentValue: 1,
        targetValue: 100,
        weight: null,
        sdgId: "1",
        subSdgId: null,
        parentId: null,
      },
      // Goal sdg 12
      {
        id: "ee4e88df-1a66-4c89-b0d2-42188ed899e3",
        name: "Gebruik van LED",
        currentValue: 48,
        targetValue: 34,
        weight: 0.5,
        sdgId: "12",
        subSdgId: null,
        parentId: null,
      }
      ,{
        id: "491fe175-c2b6-4279-be4a-5de802547d91",
        name: "Openbare verlichting (OV)",
        currentValue: 0,
        targetValue: 0,
        weight: 0,
        sdgId: null,
        subSdgId: null,
        parentId:"ee4e88df-1a66-4c89-b0d2-42188ed899e3" 
      },
      //sdg goal 2
      {
        id: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        name: "Donaties voedselbanken",
        currentValue: 32,
        targetValue: 176,
        weight: null,
        sdgId: "2",
        subSdgId: null,
        parentId: null,
      },
      {
        id: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        name: "Verspilling limiteren",
        currentValue: 69,
        targetValue: 100,
        weight: null,
        sdgId: "2",
        subSdgId: null,
        parentId: null,
      },
      //GOAL 3 (not optionally linked to a specific sub SDG)
      {
        id: "f3328d22-231d-4947-8883-024e8b3a5e48",
        name: "Natuurgebieden voorzien",
        currentValue: null,
        targetValue: null,
        weight: null,
        sdgId: "3",
        subSdgId: null,
        parentId: null,
      },
      //SUB goals of goal 3
      {
        id: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
        name: "Bomen planten",
        currentValue: 16,
        targetValue: 50,
        weight: 1.5,
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      {
        id: "524bc55c-8c86-454b-93a5-620ccc818339",
        name: "Betonstop garanderen",
        currentValue: 16,
        targetValue: 54,
        weight: 2.5,
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      {
        id: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
        name: "Natuurgebieden promoten",
        currentValue: 7,
        targetValue: 43,
        weight: 3,
        sdgId: null,
        subSdgId: null,
        parentId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      },
      //GOAL 17 (optionally linked to subSDG 17.2)
      {
        id: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
        name: "Verenigingen aanmoedigen",
        currentValue: null,
        targetValue: null,
        weight: null,
        sdgId: "17",
        subSdgId: "17.2",
        parentId: null,
      },
      //SUB GOALS of goal 17
      {
        id: "637d7bab-a67d-4791-ba58-187320c06cb6",
        name: "Teamspirit verhogen",
        currentValue: 43,
        targetValue: 78,
        weight: 1,
        sdgId: null,
        subSdgId: null,
        parentId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      },
      {
        id: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
        name: "SDGs promoten",
        currentValue: 23,
        targetValue: 25,
        weight: 0.5,
        sdgId: null,
        subSdgId: null,
        parentId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      },
    ]);
  },
};
