const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");
const Group = require("../models/group.js")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u3Token,
  u2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /groups/new", function(){
    test("creates new group", async function(){
        const resp = await request(app).post("/groups/new")
        .send({group_name: "NEW_GROUP"})
        .set("authorization", `Bearer ${u3Token}`)
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
          group: {
           id: expect.any(Number),
           group_name: "NEW_GROUP"
          }
        })
    })
})