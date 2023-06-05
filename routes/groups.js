const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn} = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../ExpressError");
const User = require("../models/user");
const Group = require("../models/group")
const { createToken } = require("../helpers/tokens");
const groupSchema = require("../schemas/groupSchema.json")


const router = express.Router();


router.post("/new", ensureLoggedIn, async function(req, res, next){
    try{
        const validator = jsonschema.validate(req.body, groupSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newGroup = await Group.create(req.body.group_name)
        return res.status(201).json({group: {...newGroup}})
    }catch(err){
        next(err)
    }
} )


module.exports = router;