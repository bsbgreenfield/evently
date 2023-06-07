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


router.post('/:group_id/join/:username',ensureLoggedIn,  async function(req,res,next){
    try{
        if(res.locals.user.username == req.params.username){
            let newMember = await User.joinGroup(req.params.username, req.params.group_id)
            return res.status(202).json({newMember})
        }
        throw new UnauthorizedError("cannot join on behalf of another user")
        
    }catch(err){
        next(err)
    }
})

router.delete('/:group_id/leave/:username', ensureLoggedIn, async function(req, res, next){
    try{
        if(res.locals.user.username == req.params.username){
            await User.leaveGroup(req.params.username, req.params.group_id)
            return res.status(202).json({'status': 'removed'})
        }
        throw new UnauthorizedError("cannot remove someone else frmo the group")
    }catch(err){
        next(err)
    }
})

module.exports = router;