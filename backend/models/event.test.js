process.env.NODE_ENV = "test"

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

const db = require("../db.js");
const Event = require("./event.js");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("get event by group_id", function(){
    test("gets events", async function(){
        let g = await db.query(`SELECT id from groups where group_name = 'g1'`)
        let events =  await Event.getByGroup(g.rows[0].id)

        expect(events).toEqual( [
            {
                event_id: expect.any(Number),
                event_name: 'testEvent',
                event_date: expect.any(Date),
                event_location: 'my_house',
                from_group: 'g1',
                participants: expect.any(Array)
              },
              {
                event_id: expect.any(Number),
                event_name: 'testEvent2',
                event_date: expect.any(Date),
                event_location: 'the_woods',
                from_group: 'g1',
                participants: expect.any(Array)
              }
        
          ]
      )

    })
})

describe("get event by user_id, including rsvps", function(){
    test("gets events", async function(){
        let u1 = await db.query(`SELECT id from users where username = 'u1'`)
        let ev = await Event.getByUser(u1.rows[0].id)
        expect(ev.length).toEqual(3)

    })
})