const supertest = require('supertest');
const createServer = require("../src/createServer");
const { getKnex } = require("../src/data");


module.exports.withServer = (setter) => {
    let server;

    beforeAll(async () => {
        server = await createServer();
        setter({
            request: supertest(server.getApp().callback()),
            knex: getKnex(),
        });
    });

    afterAll(async () => {
        await server.stop();
    });
}

module.exports.login = async (supertest) => {
    const response = await supertest.post('/api/user/login').send({
        username: "Ann.Onym",
        password: "12345678"
    });

    if (response.statusCode !== 200) {
        throw new Error(response.body.message || 'Unkown error occured');
    }

    return `Bearer ${response.body.token}`;
}