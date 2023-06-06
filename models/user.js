const db = require("../db");
const bcrypt = require("bcrypt");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../ExpressError");

const { sqlForPartialUpdate } = require("../helpers/sql")
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const app = require("../app");
const { query } = require("express");


class User {
  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                      password,
                      first_name AS "firstName",
                      last_name AS "lastName",
                      email
               FROM users
               WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];
    console.log(user)
    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email}
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
               FROM users
               WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
               (
                username,
                password,
                first_name,
                last_name,
                email)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  static async get(username) {
    let user = await db.query(`SELECT * FROM users where username = $1`, [username])
    if (user.rows.length) {
      const { id, username, first_name, last_name } = user.rows[0]
      return { id: id, username: username, firstName: first_name, lastName: last_name }
    }
    throw new NotFoundError("user not found")
  }


  static async getAll() {
    const result = await db.query(
      `SELECT    users.id, 
                users.username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  groups.id as "group_id"
           FROM users
           LEFT JOIN users_groups
           ON users.id = users_groups.user_id
           LEFT JOIN groups
           ON users_groups.group_id = groups.id 
           ORDER BY users.username`,
    );
    let currUser = result.rows[0].username;
    let resp = [{
      "username": result.rows[0].username,
      "firstName": result.rows[0].firstName,
      "lastName": result.rows[0].lastName,
      "email": result.rows[0].email,
      "groups": []
    }];
    for (let userObj of result.rows) {
      // if the current object is for the same user, just add the job_id to applications array of the last object
      if (userObj.username == currUser) {
        resp[resp.length - 1].groups.push(userObj.group_id)
      }
      // otherwise, create a new object
      else {
        resp.push({
          "username": userObj.username,
          "firstName": userObj.firstName,
          "lastName": userObj.lastName,
          "email": userObj.email,
          "groups": userObj.group_id != null ? [userObj.group_id] : []
        })
        currUser = userObj.username
      }
    }
    return resp;
  }



  static async joinGroup(username, group_id) {
    console.log(username, group_id)
    let user = await this.get(username)
    console.log(user)
    await db.query(
      `INSERT INTO users_groups
              (user_id, group_id)
              VALUES ($1, $2)`, [user.id, group_id])
    let res = await db.query(
      `SELECT user_id, group_id FROM users_groups WHERE 
      user_id = $1 and group_id = $2`, [user.id, group_id])
    console.log(res.rows)
  return res.rows[0]
  }

  static async rsvp(user_id, event_id) {
    let dup_check = await db.query(`
        SELECT * FROM participant
        WHERE event_id = $1 and user_id = $2 `, [event_id, user_id])

    if (!dup_check.rows.length) {
      let participant = await db.query(
        `INSERT INTO participant
            (event_id, user_id)
            VALUES 
            ($1, $2)`, [event_id, user_id])
      return participant.rows
    }

    throw new BadRequestError("this user is already signed up for this event")
  }

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const checkForUser = await db.query(`SELECT * from users WHERE username = $1`, [username])
    if (!checkForUser.rows.length) throw new NotFoundError("no such user")
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "first_name",
        lastName: "last_name"
      });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  static async remove(username) {
    let result = await db.query(
      `DELETE
       FROM users
       WHERE username = $1
       RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }
}

module.exports = User;