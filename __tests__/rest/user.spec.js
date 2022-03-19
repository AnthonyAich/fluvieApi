const { withServer, login } = require('../supertest.setup');
const { tables } = require("../../src/data");

const USERS = [
    {
        id: "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        username: "Jack.Pott",
        email: "jack.pott@gmail.com",
        rolename: "Directeur"
    }
]

const PASSWORD = "12345678";

const LOGINRETURNBODY = {
    "user": {
        "id": "1badf424-cb38-4f2d-9865-533d1c5d6fdb",
        "username": "Jack.Pott",
        "email": "jack.pott@gmail.com",
        "rolename": "Directeur"
    },
};

let request;
let knex;
let loginHeader;
describe('users', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });

    const url = '/api/user';

    beforeAll(async () => {
        loginHeader = await login(request);
    });

    describe('GET api/user/:id', () => {
        it('should return user and status 200', async () => {
            const response = await request.get(`${url}/${USERS[0].id}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(USERS[0]);
        })
    });

    describe('GET api/user/login', () => {
        it('should log in a user and return his data alongside rolename', async () => {
            const response = await request.post(`${url}/login`)
                .set('Authorization', loginHeader).send(
                    {
                        username: USERS[0].username,
                        password: PASSWORD,
                    }
                );
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(LOGINRETURNBODY);
        });
    });
});