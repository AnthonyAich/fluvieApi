const { withServer, login } = require('../supertest.setup');
const { tables } = require("../../src/data");

const FIRST = [
  {
    "id": "637d7bab-a67d-4791-ba58-187320c06cb6",
    "name": "Teamspirit verhogen",
    "currentValue": 43,
    "targetValue": 78,
    "weight": 1,
    "sdgId": null,
    "subSdgId": null,
    "parentId": "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
    "title": null,
    "color": null,
    "url": null,
    "interested": 1
  },
  {
    "id": "fd02ad91-e9ed-492f-8d2a-ef7f02d61561",
    "name": "SDGs promoten",
    "currentValue": 23,
    "targetValue": 25,
    "weight": 1,
    "sdgId": null,
    "subSdgId": null,
    "parentId": "02ef8d49-5f9c-4c11-aa00-1cc19da143cd",
    "title": null,
    "color": null,
    "url": null,
    "interested": 1
  }
] 

const SECOND = [
  {
    "id": "6e8c05ef-131b-47b7-8369-dff051204608",
    "name": "Sociale Zekerheid",
    "currentValue": 1,
    "targetValue": 100,
    "weight": null,
    "sdgId": "1",
    "subSdgId": null,
    "parentId": null,
    "title": "No Poverty",
    "color": "#e5243b",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_1.png",
    "interested": 0
  },
  {
    "id": "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
    "name": "Voedsel verzamelen",
    "currentValue": 32,
    "targetValue": 176,
    "weight": null,
    "sdgId": "2",
    "subSdgId": null,
    "parentId": null,
    "title": "Zero Hunger",
    "color": "#e5b735",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_2.png",
    "interested": 1
  },
  {
    "id": "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
    "name": "Verspilling limiteren",
    "currentValue": 69,
    "targetValue": 100,
    "weight": null,
    "sdgId": "2",
    "subSdgId": null,
    "parentId": null,
    "title": "Zero Hunger",
    "color": "#e5b735",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_2.png",
    "interested": 1
  },
  {
    "id": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "name": "Natuurgebieden voorzien",
    "currentValue": null,
    "targetValue": null,
    "weight": null,
    "sdgId": "3",
    "subSdgId": null,
    "parentId": null,
    "title": "Good Health and Well-being",
    "color": "#4c9f38",
    "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_3.png",
    "interested": 1
  }
]

const THIRD = [
    {
        "id": "6e8c05ef-131b-47b7-8369-dff051204608",
        "name": "Sociale Zekerheid",
        "currentValue": 1,
        "targetValue": 100,
        "weight": null,
        "sdgId": "1",
        "subSdgId": null,
        "parentId": null,
        "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_1.png",
        "visible": 1
      },
      {
        "id": "2a8c3516-fca3-407f-8336-0f7ff13ba0d0",
        "name": "Voedsel verzamelen",
        "currentValue": 32,
        "targetValue": 176,
        "weight": null,
        "sdgId": "2",
        "subSdgId": null,
        "parentId": null,
        "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_2.png",
        "visible": 1
      },
      {
        "id": "9f92e8f6-9601-4752-ac9e-d45f7ec39272",
        "name": "Verspilling limiteren",
        "currentValue": 69,
        "targetValue": 100,
        "weight": null,
        "sdgId": "2",
        "subSdgId": null,
        "parentId": null,
        "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_2.png",
        "visible": 1
      },
      {
        "id": "f3328d22-231d-4947-8883-024e8b3a5e48",
        "name": "Natuurgebieden voorzien",
        "currentValue": null,
        "targetValue": null,
        "weight": null,
        "sdgId": "3",
        "subSdgId": null,
        "parentId": null,
        "url": "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_3.png",
        "visible": 1
      }
]

const FOURTH = [
     {
    "id": "524bc55c-8c86-454b-93a5-620ccc818339",
    "name": "Betonstop garanderen",
    "currentValue": 16,
    "targetValue": 54,
    "weight": 3,
    "sdgId": null,
    "subSdgId": null,
    "parentId": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "visible": 0
  },
  {
    "id": "5b7b89ef-b045-45a4-92a3-1d9cde8bfc52",
    "name": "Bomen planten",
    "currentValue": 16,
    "targetValue": 50,
    "weight": 2,
    "sdgId": null,
    "subSdgId": null,
    "parentId": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "visible": 0
  },
  {
    "id": "c69d8dad-d2fe-4833-be75-a5463e0cf9a0",
    "name": "Natuurgebieden promoten",
    "currentValue": 7,
    "targetValue": 43,
    "weight": 3,
    "sdgId": null,
    "subSdgId": null,
    "parentId": "f3328d22-231d-4947-8883-024e8b3a5e48",
    "visible": 0
  }
]

const FIRSTINPUT = "Verenigingen aanmoedigen"
const SECONDINPUT  = "Economisch";
const THIRDINPUT = "b1d22218-734b-4e19-b493-f06a0409afd4/Economisch"
const FOURTHINPUT = "d38dc4d7-1734-4d4d-967a-c6b25d120667/Natuurgebieden%20voorzien"

let request;
let knex;
let loginHeader;
describe('goal', () => {
    withServer(({
        request: r,
        knex: k
    }) => {
        request = r;
        knex = k;
    });

    const url = '/api/goal';

    beforeAll(async () => {
        loginHeader = await login(request);
    });

    describe('GET api/goal/children/:name', () => {
        it('should return children of category and status 200', async () => {
            const response = await request.get(`${url}/children/${FIRSTINPUT}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(FIRST);
        })
    });

    describe('GET api/goal/category/:name', () => {
        it('should return goal with the given name and status 200', async () => {
            const response = await request.get(`${url}/category/${SECONDINPUT}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(SECOND);
        })
    });

    describe('GET api/goal/roles/:roleId/:category', () => {
        it('should return goal by given category and role and status 200', async () => {
            const response = await request.get(`${url}/roles/${THIRDINPUT}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(THIRD);
        })
    });

    describe('GET api/goal/parents/:roleId/:parent', () => {
        it('should return goals by parent and role and status 200', async () => {
            const response = await request.get(`${url}/parents/${FOURTHINPUT}`)
                .set('Authorization', loginHeader);
            expect(response.status).toBe(200);
            console.log(response.body);
            expect(response.body).toMatchObject(FOURTH);
        })
    });
});