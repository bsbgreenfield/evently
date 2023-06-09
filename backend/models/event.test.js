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
              from_group: 'g1',
              event_name: 'testEvent',
              event_date: expect.any(Date),
              event_location: 'my_house'
            }
          ]
      )

    })
})