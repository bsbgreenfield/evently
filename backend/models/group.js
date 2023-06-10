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

  static async create(group_name) {
    let newGroup = await db.query(
      `INSERT INTO groups (group_name)
        VALUES ($1)
        returning id, group_name`, [group_name]
    )
    return newGroup.rows[0]
  }

  static async get(group_id) {
    let group = await db.query(
      `SELECT groups.id as "group_id",
        group_name,
        users.username AS "username",
        users.first_name as "first",
        users.last_name AS "last"
        FROM groups
        LEFT JOIN users_groups ON groups.id = users_groups.group_id
        LEFT JOIN users ON users_groups.user_id = users.id
        WHERE groups.id = $1`, [group_id]
    )
    let groupMessages = await db.query(
      `SELECT groups.id as "group_id",
      messages.sender_id as "poster",
      messages.content as "content", 
      users.username as "username"
      FROM groups
      LEFT JOIN messages 
      ON groups.id = messages.group_id
      LEFT JOIN users ON messages.sender_id = users.id
      WHERE groups.id = $1`, [group_id]
    )
    let res = {
      id: group.rows[0].group_id,
      group_name: group.rows[0].group_name,
      members: [],
      messages: []
    }

    for (let groupObj of group.rows) {
      res.members.push({
        username: groupObj.username,
        first_name: groupObj.first,
        last_name: groupObj.last
      })
    }
    for(let groupMessageObj of groupMessages.rows){
      res.messages.push({
        poster: groupMessageObj.poster,
        username: groupMessageObj.username,
        content: groupMessageObj.content
      })
    }
    console.log(res)
    return res;
  }

  static async getAll() {
    let groups = await db.query(
      `SELECT groups.id as group_id, group_name, users.username AS "username", users.first_name as "first", users.last_name AS "last"
        FROM groups
        LEFT JOIN users_groups ON groups.id = users_groups.group_id
        LEFT JOIN users ON users_groups.user_id = users.id
        ORDER BY group_name`
    )
    let currGroup = groups.rows[0].group_name
    let res = [{
      id: groups.rows[0].group_id,
      group_name: groups.rows[0].group_name,
      members: []
    }]
    for (let groupObj of groups.rows) {
      if (groupObj.group_name == currGroup) {
        res[res.length - 1].members.push(
          {
            username: groupObj.username,
            first_name: groupObj.first,
            last_name: groupObj.last
          })
      }
      else {
        res.push(
          {
            id: groupObj.group_id,
            group_name: groupObj.group_name,
            members: [{
              username: groupObj.username,
              first_name: groupObj.first,
              last_name: groupObj.last
            }]
          }
        )
        currGroup = groupObj.group_name
      }
    }
    return res
  }
}

module.exports = Group;