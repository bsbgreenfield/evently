const db = require("../db");
const bcrypt = require("bcrypt");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../ExpressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const app = require("../app");
const { query } = require("express");


class User {
    static async authenticate(username, password) {
        console.log("I AM AUTHENTICATING")
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
          { username, password, firstName, lastName, email}) {
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

      static async get(username){
        let user = await db.query(`SELECT * FROM users where username = $1`, [username])
        if (user.rows.length){
          return user.rows[0]
        }
        throw new BadRequestError("user not found")
      }
      static async joinGroup(username, group_id) {
        let user = await this.get(username)
        console.log(user)
        await db.query(
          `INSERT INTO users_groups
              (user_id, group_id)
              VALUES ($1, $2)`, [user.id, group_id])
      }

      static async rsvp(user_id, event_id){
        let dup_check = await db.query(`
        SELECT * FROM participant
        WHERE event_id = $1 and user_id = $2 `, [event_id, user_id])

        if (!dup_check.rows.length){
          let participant = await db.query(
            `INSERT INTO participant
            (event_id, user_id)
            VALUES 
            ($1, $2)`, [event_id, user_id])
            return participant.rows
        }
        
        throw new BadRequestError("this user is already signed up for this event")
      }
}

module.exports = User;