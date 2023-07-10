const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../ExpressError");
const User = require("../models/user");
const Event = require("../models/event")
const { createToken } = require("../helpers/tokens");
const eventSchema = require("../schemas/eventSchema.json")


const router = express.Router();


router.post("/", ensureLoggedIn, async function (req, res, next) {
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


router.post("/:event_id/join/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        if (res.locals.user.username == req.params.username) {
            let rsvp = await User.rsvp(req.params.username, req.params.event_id)
            return res.status(201).json({ rsvp})
        }
        throw new UnauthorizedError("Can only add self to event")
    } catch (err) {
        next(err)
    }
})

router.delete("/:event_id/unrsvp/:username", ensureLoggedIn, async function(req,res,next){
    try{
        if (res.locals.user.username == req.params.username){
            await User.unrsvp(req.params.username, req.params.event_id)
            return res.status(202).json({'status': 'deleted'})
        }
        throw new UnauthorizedError("Can only remove self from event")
    }catch(err){
        next(err)
    }
})

router.get('/:group_id', ensureLoggedIn, async function(req, res, next){
    try{
        let events = await Event.getByGroup(req.params.group_id)
        
        if(events.length) return res.json({events})
        else if (events != "pass")throw new NotFoundError(`No events found which are associated with group ${req.params.group_id}`)
    }catch(err){
        next(err)
    }
})

router.get("/user/:user_id", ensureLoggedIn, async function(req, res, next){
    try{
        console.log(req.params.user_id)
        let events = await Event.getByUser(req.params.user_id)
        if(events.length) return res.json({events})
        return [];
    }catch(err){
        next(err)
    }
})


module.exports = router;