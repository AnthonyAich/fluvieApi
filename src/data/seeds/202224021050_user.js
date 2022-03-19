const { tables } = require("..");

/**
 * Fills the table user
 *
 * @see /migrations/202224021037_createUser.js
 */
module.exports = {
  seed: async (knex) => {
    await knex(tables.User).delete();
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
  },
};
