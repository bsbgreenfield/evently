const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const Event = require("../models/group.js")

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

describe("POST /events", function () {
    test("creates new event", async function () {
        let g1 = await db.query(`SELECT id from groups where group_name = 'g1'`)
        let group = g1.rows[0]
        const resp = await request(app).post("/events")
            .send({ group_id: group.id, event_name: "tester_event", event_date: "08-01-2024", event_location: "anywhere" })
            .set("authorization", `Bearer ${u3Token}`)
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            event: {
                id: expect.any(Number),
                group_id: expect.any(Number),
                event_name: "tester_event",
                event_date: "2024-08-01T07:00:00.000Z",
                event_location: "anywhere"
            }
        })
    })
    test("doesnt work for anon", async function () {
        let g1 = await db.query(`SELECT id from groups where group_name = 'g1'`)
        let group = g1.rows[0]
        const resp = await request(app).post("/events")
            .send({ group_id: group.id, event_name: "test_event", event_date: "08-01-2024", event_location: "anywhere" })
        expect(resp.statusCode).toEqual(401);
    })
})