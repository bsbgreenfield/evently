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

describe("POST /groups/:group_id/join/:username", function(){
  test("joins group", async function(){
    let group = await db.query(
      `SELECT * from groups where group_name = 'g1'`
    )
    const resp = await request(app)
    .post(`/groups/${group.rows[0].id}/join/u3`)
    .send({})
    .set("authorization", `Bearer ${u3Token}`)

    expect(resp.body).toEqual(
      { newMember:
       {
        user_id: expect.any(Number),
        group_id: expect.any(Number)
       } 
      }
    )
  })
})

describe("DELETE /groups/:group_id/leave/:username", function(){
  test("leaves group", async function(){
    let group = await db.query(
      `SELECT * from groups where group_name = 'g1'`
    )
    const resp = await request(app)
    .delete(`/groups/${group.rows[0].id}/leave/u1`)
    .send({})
    .set("authorization", `Bearer ${u1Token}`)
    
    expect(resp.body).toEqual(
      { "status":"removed"
      }
    )
  })
})

describe("GET /:group_id", function(){
  test("gets a group", async function(){
    let group = await db.query(
      `SELECT id from groups where group_name = 'g1'`
    )
    const resp = await request(app)
    .get(`/groups/${group.rows[0].id}`)
    .send({})
    .set("authorization", `Bearer ${u1Token}`)

    expect(resp.body).toEqual({
      group:  {
        id: expect.any(Number),
        group_name: 'g1', 
        members: [{
          username: 'u1', 
          first_name: 'U1F',
          last_name: 'U1L'
        }],
        messages: [
          { username: 'u1', poster: expect.any(Number), content: 'Hello, how is everyone?' },
          { username: 'u2',poster: expect.any(Number), content: "I'm doing great, thanks!" },
          { username: 'u2',poster: expect.any(Number), content: 'Anyone up for an event this weekend?' }
        ]
  
      }
    }
     
    )
  })
})