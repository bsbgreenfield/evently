process.env.NODE_ENV = "test"
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

const db = require("../db.js");
const User = require("./user.js");

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



/************************************** authenticate */

describe("authenticate", function () {
    console.log("!!!!!!!!TESTING!!!!!!!!!!!!")
    test("works", async function () {
        console.log('this is the first test')
        const user = await User.authenticate("u1", "password1");
        console.log(user)
        expect(user).toEqual({
            username: "u1",
            firstName: "U1F",
            lastName: "U1L",
            email: "u1@example.com",
        });
    });

    test("unauth if no such user", async function () {
        try {
            await User.authenticate("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });

    test("unauth if wrong password", async function () {
        try {
            await User.authenticate("u1", "wrong");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/************************************** register */

describe("register", function () {
    const newUser = {
        username: "new",
        firstName: "Test",
        lastName: "Tester",
        email: "test@test.com",
    };

    test("works", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("bad request with dup data", async function () {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

describe("join group", function(){
    
    test("works", async function(){
        let user = await db.query(`select id from users where username = 'u1'`)
        let group = await db.query(`SELECT id from groups WHERE group_name = 'g3'`)
        await User.joinGroup('u1', group.rows[0].id )
        let res = await db.query(
            `select * from users_groups WHERE user_id = $1
            AND group_id = $2`, [user.rows[0].id, group.rows[0].id])
        expect(res.rows.length).toEqual(1)
    })

})

describe("rsvp", function(){
    test("works", async function(){
        let user = await db.query(`select id from users where username = $1`, ['u1'])
        let event = await db.query(`select id from events WHERE event_name = $1`, ['testEvent'])
       await User.rsvp(user.rows[0].id, event.rows[0].id)
       let row = await db.query(
        `SELECT * FROM participant WHERE
         user_id = $1 and event_id = $2`, [user.rows[0].id, event.rows[0].id])
        expect(row.rows.length).toEqual(1)
    })
})


describe("getAll", function(){
    test("gets all users with their groups", async function(){
        let usersList = await User.getAll()
        expect(usersList[0].groups.length).toEqual(2)
        expect(usersList[1].groups.length).toEqual(2)
    })
})

