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
    let res = await db.query(
      `SELECT users.id,
      users.username,
       users.first_name AS "firstName",
       users.last_name AS "lastName",
       users.email as "email",
       groups.id as "group_id"
       FROM users 
       LEFT JOIN users_groups
       ON users.id = users_groups.user_id
       LEFT JOIN groups
       ON users_groups.group_id = groups.id 
       WHERE users.username = $1`, [username])
    if (res.rows.length) {
      let user = {
        "id": res.rows[0].id,
        "username": res.rows[0].username,
        "firstName": res.rows[0].firstName,
        "lastName": res.rows[0].lastName,
        "email": res.rows[0].email,
        "groups": []
      };

      for (let userObj of res.rows) {
        user.groups.push(userObj.group_id)
      }
      const { id, username, firstName, lastName, groups } = user
      return { id, username, firstName, lastName, groups }
    }
    throw new NotFoundError("user not found")
  }

  static async getUsersByIds(idList){
    console.log("ID LIST:",idList)
    let userIdString = `(${idList})`
    let userRows = await db.query(`SELECT * FROM users WHERE id IN ${userIdString}`)
    console.log(userRows.rows)
    return userRows.rows 
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
    let user = await this.get(username)
    await db.query(
      `INSERT INTO users_groups
              (user_id, group_id)
              VALUES ($1, $2)`, [user.id, group_id])
    let res = await db.query(
      `SELECT user_id, group_id FROM users_groups WHERE 
      user_id = $1 and group_id = $2`, [user.id, group_id])
    return res.rows[0]
  }



  static async rsvp(username, event_id) {
    let u = await this.get(username)
    let user_id = u.id
    let dup_check = await db.query(`
        SELECT * FROM participant
        WHERE event_id = $1 and user_id = $2 `, [event_id, user_id])

    if (!dup_check.rows.length) {
      let participant = await db.query(
        `INSERT INTO participant
            (event_id, user_id)
            VALUES 
            ($1, $2)
            RETURNING event_id, user_id`, [event_id, user_id])
      
      return participant.rows[0]
    }

    throw new BadRequestError("this user is already signed up for this event")
  }

  static async unrsvp(username, event_id){
    let u = await this.get(username)
    let user_id = u.id
    let dup_check = await db.query(`
        SELECT * FROM participant
        WHERE event_id = $1 and user_id = $2 `, [event_id, user_id])

    if (dup_check.rows.length) {
      let participant = await db.query(
        `DELETE FROM participant
        WHERE user_id = $1 and event_id = $2
        `,[user_id, event_id]
      )
    return 
    }
    throw new BadRequestError(`User ${username} not signed up for this event`)
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

  static async leaveGroup(username, group_id){
    let user = await this.get('u1')
    let dup_check = await db.query(
      `SELECT * from users_groups 
      WHERE user_id = $1 and group_id = $2`, [user.id, group_id])
    if(dup_check.rows.length){
      await db.query(
        `DELETE FROM users_groups
        WHERE user_id = $1 and group_id = $2`
        , [user.id, group_id])
      return
    }
    throw new BadRequestError(`user ${username} is not part of this group`)
  }

  static async inviteToGroup(from, to, group_id){
    let dup_check = await db.query(
      `SELECT * FROM Invites 
      WHERE from_user=$1
      AND to_user = $2
      AND group_id = $3`, [from, to, group_id])
    if(!dup_check.rows.length){
      let invite = await db.query(
        `
        INSERT INTO Invites (from_user, to_user, group_id)
        VALUES ($1, $2, $3)
        RETURNING from_user, to_user, group_id`, [from, to , group_id]
      )
      return invite
    }
    else{
      throw new BadRequestError(`This invite is already pending`)
    }
  
  }

  static async getInvites(user_id){
    let sent = await db.query(`
    SELECT 
    from_user, to_user, group_id, users.username, groups.group_name
    FROM Invites 
    LEFT JOIN users
    ON from_user = users.id
    LEFT JOIN groups
    ON groups.id = Invites.group_id
    WHERE from_user = $1
    `, [user_id])
    let received = await db.query(`
    SELECT 
    from_user, to_user, group_id, users.username, groups.group_name
    FROM Invites 
    LEFT JOIN users
    ON from_user = users.id
    LEFT JOIN groups
    ON groups.id = Invites.group_id
    WHERE to_user = $1
    `, [user_id])

    return {"sent": sent.rows, "receieved": received.rows}
  }
  static async removeInvite(group_id, user_id){
    let removed = await db.query(
      `
      DELETE FROM Invites 
      WHERE to_user = $1
      AND group_id = $2
      `, [user_id, group_id]
    )
  }

  static async requestMoney(recipient, payer, amount, event_id = null, group_id = null, description = null) {
    let user = await db.query(`SELECT username from users where id = $1`, [recipient])

    let requestingUser = this.get(user.rows[0].username)
    if (group_id && requestingUser.groups) {

    }
    let result = await db.query(
      `INSERT INTO invoices
      (group_id, payer_id, recipient_id, amount, description_text, event_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING payer_id, recipient_id, amount, description_text`,
      [group_id, payer, recipient, amount, description, event_id]
    )
    const invoice = result.rows[0]
    if (!invoice) throw new BadRequestError("Cannot process invoice request")
    return invoice
  }
}

module.exports = User;