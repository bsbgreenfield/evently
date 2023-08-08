const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../ExpressError");
const ticketmaster = require("../models/ticketmaster");
const { createToken } = require("../helpers/tokens");



const router = express.Router();

router.get("/events", ensureLoggedIn, async function(req, res, next){
    try{
        let eventdata = await ticketmaster.getEvent(req.query)
        
        return res.status(200).json({"data": eventdata})
    }catch(err){
        next(err)
    }
   
})

module.exports = router;