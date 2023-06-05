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


class Group {

    static async create(group_name){
       let newGroup =  await db.query(
        `INSERT INTO groups (group_name)
        VALUES ($1)
        returning id, group_name`, [group_name]
       )
       console.log(newGroup.rows[0])
       return newGroup.rows[0]
    }
}

module.exports = Group;