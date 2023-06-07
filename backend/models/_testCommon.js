const bcrypt = require("bcrypt");


const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM groups");
  await db.query("DELETE FROM events");
  await db.query("DELETE FROM participant");
  await db.query("DELETE FROM media");
  await db.query("DELETE FROM messages");


  await db.query(`
  INSERT INTO users (username, password, first_name, last_name, email )
  VALUES
  ('u1', $1, 'U1F', 'U1L', 'u1@example.com'),
    ('u2', $2, 'U2F', 'U2L', 'u2@example.com'),
    ('u3', $3, 'U3F', 'U3L', 'u3@example.com')`,
    [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
    ]);

  await db.query(`
  INSERT INTO Groups ( group_name)
  VALUES
    ('g1'),
    ('g2'),
    ('g3')`);

  let u1 = await db.query(`SELECT id from users WHERE username = 'u1'`)
  let u2 = await db.query(`SELECT id from users WHERE username = 'u2'`)
  let u3 = await db.query(`SELECT id from users WHERE username = 'u3'`)
  let g1 = await db.query(`SELECT id from groups WHERE group_name = 'g1'`)
  let g2 = await db.query(`SELECT id from groups WHERE group_name = 'g2'`)
  let g3 = await db.query(`SELECT id from groups WHERE group_name = 'g3'`)
  await db.query(`
  INSERT INTO Users_Groups ( user_id, group_id)
  VALUES
    ($1, $4),
    ($1, $5),
    ($2, $4),
    ($2, $6),
    ($3, $5),
    ($3, $6)`, 
    [u1.rows[0].id, u2.rows[0].id, u3.rows[0].id ,g1.rows[0].id, g2.rows[0].id, g3.rows[0].id])

  let e1 = await db.query(
      `INSERT INTO events
      (group_id, event_name, event_date, event_location)
      VALUES
      ($1, $2, $3, $4)
      returning id`, [g1.rows[0].id, 'testEvent', '12-01-2023', 'my_house'])

    await db.query(
        `INSERT INTO participant (user_id, event_id)
        VALUES ($1,$2)`, [u1.rows[0].id, e1.rows[0].id]
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
  
  
  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  };