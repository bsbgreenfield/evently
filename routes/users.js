
/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, isLoggedInAdmin } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../ExpressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


router.post("/", async function(req, res, next){
    try{
        const validator = jsonschema.validate(req.body, userNewSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({...req.body});
        const token = createToken(newUser)
        return res.status(201).json({newUser, token});
    } catch(err) {
        return next(err)
    }

})



router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const users = await User.getAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login
 **/

router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        // check if the user being searched for is the logged in user
        if (res.locals.user.username == req.params.username) {
            const user = await User.update(req.params.username, req.body);
            return res.json({ user });
        }
        else {
            throw new UnauthorizedError()
        }
    } catch (err) {
        return next(err);
    }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

router.delete("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.remove(req.params.username);
        if (res.locals.user.username != user.username && !res.locals.user.isLoggedInAdmin) {
            throw new UnauthorizedError()
        }
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;