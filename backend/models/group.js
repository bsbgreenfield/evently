const db = require("../db");


const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../ExpressError");

const { sqlForPartialUpdate } = require("../helpers/sql")
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const app = require("../app");
const { query } = require("express");


class Group {

    static async create(group_name){
       let newGroup =  await db.query(
        `INSERT INTO groups (group_name)
        VALUES ($1)
        returning id, group_name`, [group_name]
       )
       return newGroup.rows[0]
    }

    static async get(group_id){
      let group = await db.query(
        `SELECT group_name, users.username AS "username", users.first_name as "first", users.last_name AS "last"
        FROM groups
        LEFT JOIN users_groups ON groups.id = users_groups.group_id
        LEFT JOIN users ON users_groups.user_id = users.id
        WHERE group_id = $1`, [group_id]
      )
      let res = {
        group_name: group.rows[0].group_name,
        members: []
      }

      for(let groupObj of group.rows){
        res.members.push({
          username: groupObj.username,
          first_name: groupObj.first,
          last_name: groupObj.last
        })
      }

      return res;
    }
}

module.exports = Group;