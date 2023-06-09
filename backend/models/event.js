const db = require("../db");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../ExpressError");

const app = require("../app");

class Event {

    static async create(group_id, event_name,event_date, event_location  ){
        let dup_check = await db.query(`SELECT * FROM events WHERE
         group_id = $1 and event_name = $2 and event_date = $3 and event_location = $4 `,
         [group_id, event_name, event_date, event_location])
         if (!dup_check.rows.length){
            try{
                let event = await db.query(
                    `INSERT INTO events
                    (group_id, event_name, event_date, event_location)
                    VALUES 
                    ($1, $2, $3, $4)
                    RETURNING id, group_id, event_name, event_date, event_location`,
                     [group_id, event_name, event_date, event_location])
                return event.rows[0]
                
            } catch {
                return new BadRequestError("cannot create event with given data")
            }
         }
       return new BadRequestError("This event has already been created")
      
    }

    static async getByGroup(group_id){
        let events = await db.query(
            `SELECT 
            events.event_name,
            events.event_date, 
            events.event_location,
            groups.group_name as "from_group"
            FROM events
            LEFT JOIN groups
            ON events.group_id = groups.id
            WHERE group_id = $1`, [group_id]
        )
 
        return events.rows
    }
}

module.exports = Event