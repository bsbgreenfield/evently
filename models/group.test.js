process.env.NODE_ENV = "test"
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

const db = require("../db.js");
const Group = require("./group.js");

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

describe("creates a new group", function(){
    test('works', async function(){
        let group = await Group.create("TESTGROUP");
        expect(group).toEqual({
            id : expect.any(Number),
            group_name: "TESTGROUP"
        })
        let res = await db.query(`SELECT * FROM groups WHERE group_name = 'TESTGROUP'`)
        expect(res.rows[0].group_name).toEqual("TESTGROUP")
    })
})
