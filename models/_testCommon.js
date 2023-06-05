const bcrypt = require("bcrypt");


const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM groups");
  await db.query("DELETE FROM events");
  await db.query("DELETE FROM users");
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

  await db.query(`
  INSERT INTO Users_Groups ( user_id, group_id)
  VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 3)`)
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