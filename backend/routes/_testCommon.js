"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query('DELETE FROM groups');
  await db.query("DELETE FROM events")


  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: true,
  });

  await db.query(`
  INSERT INTO Groups ( group_name)
  VALUES
    ('g1'),
    ('g2'),
    ('g3')`);

  
  let rsvp = await db.query(
    `INSERT INTO events (event_name, event_date, event_location)
     VALUES ('new_event', '12-12-2024', 'outdoors')
     RETURNING id`
  )

  let user1 = await User.get('u1')
  let group1 = await db.query(`SELECT * from groups where group_name = 'g1'`)

  await db.query(
    `INSERT INTO participant (user_id, event_id)
    VALUES ($1, $2)`, [user1.id, rsvp.rows[0].id]
  )

  await db.query(
    `INSERT INTO users_groups (user_id, group_id)
    VALUES ($1, $2)`, [user1.id, group1.rows[0].id ]
  )

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", first_name: "U1F", last_name:"U1L" });
const u3Token = createToken({ username: "u3",first_name: "U3F ", last_name: "U3L"});
const u2Token = createToken({ username: "u2", first_name: "U2F", last_name: "U2L"});
module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u3Token,
  u2Token
};
