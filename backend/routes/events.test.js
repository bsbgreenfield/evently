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

describe("join an event", function () {
    test("joins event", async function () {
        const event = await db.query(`SELECT * from events where event_name = 'new_event'`)
        const resp = await request(app)
            .post(`/events/${event.rows[0].id}/join/u2`)
            .set("authorization", `Bearer ${u2Token}`)
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({ rsvp: { event_id: expect.any(Number), user_id: expect.any(Number) } })

    })

    test("doesnt work if user is already signed up", async function(){
        const event = await db.query(`SELECT * from events where event_name = 'new_event'`)
        const resp = await request(app)
            .post(`/events/${event.rows[0].id}/join/u2`)
            .send({})
            .set("authorization", `Bearer ${u2Token}`)
    
        const resp2 = await request(app)
                .post(`/events/${event.rows[0].id}/join/u2`)
                .send({})
                .set("authorization", `Bearer ${u2Token}`)
        expect(resp2.body.error.message).toEqual('this user is already signed up for this event')
        expect(resp2.statusCode).toEqual(400)
    })
})

describe("un rsvp for event", function(){
    test('removes participant', async function(){
        const event = await db.query(`SELECT * from events where event_name = 'new_event'`)
        const resp = await request(app)
        .delete(`/events/${event.rows[0].id}/unrsvp/u1`)
        .set("authorization", `Bearer ${u1Token}`)
        expect(resp.statusCode).toEqual(202)
        expect(resp.body).toEqual({ 'status': 'deleted' })
    })
})

describe("get all events associated with an group", function(){
    test("get events", async function(){
        const g = await db.query(`SELECT id from groups where group_name = 'g1'`)
        const resp = await request(app)
        .get(`/events/${g.rows[0].id}`)
        .send({})
        .set("authorization", `Bearer ${u2Token}`)
        expect(resp.body).toEqual({events:
            [
                {
                    event_name: 'g1event',
                    event_date: '2024-12-13T08:00:00.000Z',
                    event_location: 'g1s house',
                    from_group: 'g1'
                  },
                  {
                    event_name: 'g1event2',
                    event_date: '2024-12-14T08:00:00.000Z',
                    event_location: 'g1s house again',
                    from_group: 'g1'
                  }
            ]
        })
    })
} )