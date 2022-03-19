const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const { initializeData, getKnex, tables } = require("../src/data");
const Role = require("../src/core/roles");
const sdgData = require("../src/data/sdgData.json");
const indicatorData = require("../src/data/indicatorData.json");
const { all, filtered } = require("../src/data/templateData");

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });

  await initializeData();

  const knex = getKnex();
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

  await knex(tables.Category).insert([
    {
      id: "b0bb0a0a-621e-4f23-9278-e477913af3fb",
      name: "Klimaat",
      color: "#b2d235",
    },
    {
      id: "5d79e9b1-45d8-4035-bacb-b814c27b3444",
      name: "Sociaal",
      color: "#a0214e",
    },
    {
      id: "a3776314-bc44-40c4-beae-bf2a5aef7e64",
      name: "Economisch",
      color: "#004C69",
    },
  ]);

  await knex(tables.SDG).insert(sdgData);

  await knex(tables.Indicator).insert(indicatorData);

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
    //sdg goal 2
    {
      id: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
      name: "Voedsel verzamelen",
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

  await knex(tables.Role).insert([
    {
      id: "eb3c0a1d-9217-45c0-bc20-79fee16cc700",
      name: "MVO Coördinator",
      color: "#004C69",
    },
    {
      id: "b1d22218-734b-4e19-b493-f06a0409afd4",
      name: "Directeur",
      color: "#FF3B30",
    },
    {
      id: "443213d4-9508-41f5-8b8e-892f6e1a5c31",
      name: "Manager",
      color: "#B2D235",
    },
    {
      id: "aaaed50b-48f8-42be-b8cf-6c80595ff85d",
      name: "Stakeholder",
      color: "#007BFF",
    },
    {
      id: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      name: "User",
      color: "#939393",
    },
  ]);

  await knex(tables.Template).insert([
    {
      id: "c401740a-2046-4458-b57f-955ddbf4e018",
      roleId: "eb3c0a1d-9217-45c0-bc20-79fee16cc700",
    },
    {
      id: "3aefcce6-422b-434c-a872-6399a104ab6a",
      roleId: "b1d22218-734b-4e19-b493-f06a0409afd4",
    },
  ]);

  await knex(tables.User).insert([
    {
      id: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      roleId: "b1d22218-734b-4e19-b493-f06a0409afd4",
      username: "Jack.Pott",
      passwordhash:
        "$argon2id$v=19$m=131072,t=6,p=1$u98C6yQ8o+XXyyTAIJ9l/g$Zuspy5S3R9ER05g7Hiz2HNUbBu784e6EsHfQjyL/NHc", // 12345678
      email: "jack.pott@gmail.com",
    },
    {
      id: "913b370a-6266-4a6f-89d7-7eae2dc93f47",
      roleId: "eb3c0a1d-9217-45c0-bc20-79fee16cc700",
      username: "Ann.Onym",
      passwordhash:
        "$argon2id$v=19$m=131072,t=6,p=1$u98C6yQ8o+XXyyTAIJ9l/g$Zuspy5S3R9ER05g7Hiz2HNUbBu784e6EsHfQjyL/NHc", // 12345678
      email: "ann.onym@gmail.com",
    },
    {
      id: "dc0b8382-badf-4cad-b323-999f0adae4a3",
      roleId: "443213d4-9508-41f5-8b8e-892f6e1a5c31",
      username: "Mike.Rotch",
      passwordhash:
        "$argon2id$v=19$m=131072,t=6,p=1$u98C6yQ8o+XXyyTAIJ9l/g$Zuspy5S3R9ER05g7Hiz2HNUbBu784e6EsHfQjyL/NHc", // 12345678
      email: "mike.rotch@gmail.com",
    },
    {
      id: "e0a08001-b4c7-4371-926a-1185a8f50872",
      roleId: "aaaed50b-48f8-42be-b8cf-6c80595ff85d",
      username: "Wayne.Kerr",
      passwordhash:
        "$argon2id$v=19$m=131072,t=6,p=1$u98C6yQ8o+XXyyTAIJ9l/g$Zuspy5S3R9ER05g7Hiz2HNUbBu784e6EsHfQjyL/NHc", // 12345678
      email: "wayne.kerr@gmail.com",
    },
    {
      id: "2827f71a-fa22-4de1-bbcd-5399974b97cc",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Levy.Tate",
      passwordhash:
        "$argon2id$v=19$m=131072,t=6,p=1$u98C6yQ8o+XXyyTAIJ9l/g$Zuspy5S3R9ER05g7Hiz2HNUbBu784e6EsHfQjyL/NHc", // 12345678
      email: "levy.tate@gmail.com",
    },
  ]);

  await knex(tables.ExternalUser).insert([
    {
      id: "2f4e0e16-4e52-4693-8c0a-f30585d56cb6",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Cara.Van",
    },
    {
      id: "442af60b-b230-4377-99dd-2222d8c5ff43",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Dick.Tater",
    },
    {
      id: "36ce5bdc-c864-42c1-bc5d-e9fc64fd0acd",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Dinah.Soares",
    },
    {
      id: "998d4f30-5785-451e-8c2e-f5cfddf2faeb",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Dusty.Rhodes",
    },
    {
      id: "9ea5f3fb-01dd-40a9-8a6b-4d8e34e7a971",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Ella.Vader",
    },
    {
      id: "7e24f340-ecb5-4eb8-83fa-4adb48561fa2",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Hugh.Jass",
    },
    {
      id: "bb7ee0a1-7e58-4963-9010-591c68764fcf",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "jerry.Atrick",
    },
    {
      id: "7da22228-12f9-4ff8-a118-67dc8abedbea",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Mo.Lestor",
    },
    {
      id: "67b5a98a-5e37-4cfa-946e-8718cd9ed4a7",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Ryan.Carnation",
    },
    {
      id: "de59acf0-8329-4d6d-afd9-128c2bb9677c",
      roleId: "d38dc4d7-1734-4d4d-967a-c6b25d120667",
      username: "Warren.Peace",
    },
  ]);

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

  await knex(tables.TemplateGoal).insert([
    // MAIN ONE
    {
      id: "9817158e-87b8-482d-85d6-b75004f5233a",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
      canView: true,
    },
    {
      id: "f5ecce10-f810-4eab-8efc-dcaa15e7e1b6",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "6e8c05ef-131b-47b7-8369-dff051204608",
      canView: true,
    },

    // MAIN TWO GOAL 1

    {
      id: "cc6cd45c-0770-4118-9f84-49533c7a8479",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
      canView: true,
    },
    {
      id: "8efe1cfb-e242-45c1-8a31-f405315f5788",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
      canView: false,
    },

    // MAIN TWO GOAL 2

    {
      id: "2481a633-26b2-48d1-88cf-d64eefd98e12",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
      canView: true,
    },
    {
      id: "d386ddbb-1ba5-414a-af3c-9cd0a2bd034f",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
      canView: false,
    },

    // MAIN THREE
    {
      id: "9ab96845-6ac4-45a9-88db-8d09d6928784",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      canView: true,
    },
    {
      id: "e3f35026-ae29-48ad-ab03-3282e5edc51f",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "f3328d22-231d-4947-8883-024e8b3a5e48",
      canView: true,
    },
    // SUB 1
    {
      id: "e4562e47-8e99-4f4f-acce-2e3e89b60ca3",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
      canView: true,
    },
    {
      id: "ea6fe4ab-4cea-4033-9905-7c00499c48d4",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
      canView: true,
    },
    // SUB 2
    {
      id: "3aa789f5-95b4-483c-9074-df137b650d2a",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
      canView: true,
    },
    {
      id: "ee0d6cd7-1ce3-46f1-8849-6ba786c8c3df",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "524bc55c-8c86-454b-93a5-620ccc818339",
      canView: true,
    },
    // SUB 3
    {
      id: "4d536086-c9fa-4cb0-9744-2699c3f4184c",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
      canView: true,
    },
    {
      id: "9aabbb62-6f3c-4446-8803-4a218c1872e3",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
      canView: true,
    },
    // MAIN 17
    {
      id: "142d6332-9f88-4b7b-a107-c8bc7e8eedc1",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      canView: true,
    },
    {
      id: "a90a8e23-9135-4598-95b8-2990e361545a",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
      canView: true,
    },
    //SUB GOAL 1 OF MAIN 17
    {
      id: "a90eb0d2-2d9e-4d4b-9135-39609716b5a6",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
      canView: true,
    },
    {
      id: "04fdd8e1-c626-4b1b-a617-0df267777296",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "637d7bab-a67d-4791-ba58-187320c06cb6",
      canView: true,
    },
    //SUB GOAL 2 OF MAIN 17
    {
      id: "54873d99-5e2b-42a9-8746-efeaa4626588",
      templateId: "c401740a-2046-4458-b57f-955ddbf4e018",
      goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
      canView: true,
    },
    {
      id: "6fb25fea-c60b-48cb-8a52-8125c1308d0a",
      templateId: "3aefcce6-422b-434c-a872-6399a104ab6a",
      goalId: "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
      canView: true,
    },
  ]);

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
    {
      userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      templateGoalId: "e3f35026-ae29-48ad-ab03-3282e5edc51f",
      interested: false,
    },
    // SUB 1
    {
      userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      templateGoalId: "ea6fe4ab-4cea-4033-9905-7c00499c48d4",
      interested: false,
    },
    // SUB 2
    {
      userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      templateGoalId: "ee0d6cd7-1ce3-46f1-8849-6ba786c8c3df",
      interested: false,
    },
    // SUB 3
    {
      userId: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
      templateGoalId: "9aabbb62-6f3c-4446-8803-4a218c1872e3",
      interested: false,
    },

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
};
