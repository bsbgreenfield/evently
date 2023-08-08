const db = require("../db");

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

const app = require("../app");

class Event {

    static async create(group_id, event_name, event_date, event_location) {
        let dup_check = await db.query(`SELECT * FROM events WHERE
         group_id = $1 and event_name = $2 and event_date = $3 and event_location = $4 `,
            [group_id, event_name, event_date, event_location])
        if (!dup_check.rows.length) {
            try {
                let event = await db.query(
                    `INSERT INTO events
                    (group_id, event_name, event_date, event_location)
                    VALUES 
                    ($1, $2, $3, $4)
                    RETURNING id, group_id, event_name, event_date, event_location`,
                    [group_id == 0 ? null: group_id, event_name, event_date, event_location])
                return event.rows[0]

            } catch {
                return new BadRequestError("cannot create event with given data")
            }
        }
        return new BadRequestError("This event has already been created")

    }

    static async getByGroup(group_id) {
        let events = await db.query(
            `SELECT 
            events.id as "event_id",
            events.event_name,
            events.event_date, 
            events.event_location,
            groups.group_name as "from_group",
            groups.id as "group_id",
            participant.user_id as "part_id"
            FROM events
            LEFT JOIN groups
            ON events.group_id = groups.id
            LEFT JOIN participant
            ON events.id = participant.event_id
            WHERE groups.id = $1
            ORDER BY events.id`, [group_id]
        )
        if (events.rows.length) {
            let currEvent = events.rows[0].event_id
            let res = [{
                event_id: events.rows[0].event_id,
                event_name: events.rows[0].event_name,
                event_date: events.rows[0].event_date,
                event_location: events.rows[0].event_location,
                from_group: events.rows[0].from_group,
                participants: []
            }]
            for (let eventObj of events.rows) {
                if (eventObj.event_id == currEvent) {
                    res[res.length - 1].participants.push(eventObj.part_id)
                }
                else {
                    res.push({
                        event_id: eventObj.event_id,
                        event_name: eventObj.event_name,
                        event_date: eventObj.event_date,
                        event_location: eventObj.event_location,
                        from_group: eventObj.from_group,
                        participants: [eventObj.part_id]
                    })
                    currEvent = eventObj.event_id
                }
            }
            return res
        }
        return "pass";
    }

    static async getByUser(user_id) {
        let groupEvents = [];
        // this gets all groups that a user is a part of
        let groupRows = await db.query(
            `
            SELECT
            groups.id as "group_id"
            FROM users_groups
            LEFT JOIN groups
            ON users_groups.group_id = groups.id
            WHERE users_groups.user_id = $1
            `, [user_id])

        // add all events to array for which user is member
        for (let group of groupRows.rows) {
            let events = await this.getByGroup(group.group_id)
            if (events.length && events instanceof Array) {
                groupEvents.push(...events)
            }
        }
        let participantRows = await db.query(`SELECT event_id FROM participant WHERE user_id = $1`, [user_id])
        // get an array of all events user is participating in 
        let participatingIn = participantRows.rows.map(event => event.event_id)
        // loop through all group events, if that event is in the above array, add rsvp: true
        groupEvents.forEach(event => event["rsvp"] = participatingIn.includes(event.event_id))
        return groupEvents;

    }

    static async getEvent(event_id) {
        let events = await db.query(
            `SELECT 
            events.id as "event_id",
            events.event_name,
            events.event_date, 
            events.event_location,
            events.group_id,
            participant.user_id as "part_id"
            FROM events
            LEFT JOIN participant
            ON events.id = participant.event_id
            WHERE events.id = $1`, [event_id]
        )
        let res = {
            event_id: events.rows[0].event_id,
            event_name: events.rows[0].event_name,
            event_date: events.rows[0].event_date,
            event_location: events.rows[0].event_location,
            group_id: events.rows[0].event_id,
            participants: []
        }
        for (let eventObj of events.rows){
            res.participants.push(eventObj.part_id)
        }
        return res
    }
}

module.exports = Event