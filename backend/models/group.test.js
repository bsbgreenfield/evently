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

describe("creates a new group", function () {
    test('works', async function () {
        let group = await Group.create("TESTGROUP");
        expect(group).toEqual({
            id: expect.any(Number),
            group_name: "TESTGROUP"
        })
        let res = await db.query(`SELECT * FROM groups WHERE group_name = 'TESTGROUP'`)
        expect(res.rows[0].group_name).toEqual("TESTGROUP")
    })
})

describe("GET(group_id)", function () {
    test('resturns group and members', async function () {
        let g = await db.query(`SELECT id from groups where group_name = 'g1'`)
        let group = await Group.get(g.rows[0].id)
        expect(group).toEqual(
            {
                id: expect.any(Number),
                group_name: 'g1',
                members: expect.any(Array),
                messages: expect.any(Array)
            }
        )
        expect(group.members.length).toEqual(2)
        expect(group.members[0]).toEqual(
            {
                username: 'u1',
                first_name: 'U1F',
                last_name: 'U1L'
            }
        )
        expect(group.messages.length).toEqual(3)
    })
})

describe("get all groups with members", function () {
    test('gets all groups', async function () {
        let groups = await Group.getAll()
        expect(groups).toEqual(
            [
                {id: expect.any(Number),  group_name: 'g1', members: expect.any(Array) },
                { id: expect.any(Number), group_name: 'g2', members: expect.any(Array) },
                { id: expect.any(Number), group_name: 'g3', members: expect.any(Array) }

            ]
        )
        expect(groups[0].members[0]).toEqual({username: 'u1', first_name: 'U1F', last_name: 'U1L'})
        console.log(groups)
    })
})
