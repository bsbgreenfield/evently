const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../ExpressError");
const User = require("../models/user");
const Event = require("../models/event")
const { createToken } = require("../helpers/tokens");
const eventSchema = require("../schemas/eventSchema.json")


const router = express.Router();


router.post("/", ensureLoggedIn, async function (req, res, next) {
    console.log(req.body)
    try {
        if (!jsonschema.validate(req.body, eventSchema)) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        let event = await Event.create(
            req.body.group_id,
            req.body.event_name,
            req.body.event_date,
            req.body.event_location)
        return res.status(201).json({ event })
    } catch (err) {
        next(err)
    }
})


module.exports = router;