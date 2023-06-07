
/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, isLoggedInAdmin } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../ExpressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userAuthSchema = require("../schemas/userAuth.json")
const userUpdateSchema = require("../schemas/userUpdate.json");
const invoiceSchema = require("../schemas/invoiceSchema.json")

const router = express.Router();


/* router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userNewSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({ ...req.body });
        const token = createToken(newUser)
        return res.status(201).json({ newUser, token });
    } catch (err) {
        return next(err)
    }

})

router.post("/login", async function (req, res, next){
    try{
        const validator = jsonschema.validate(req.body, userAuthSchema )
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const token = await User.authenticate(req.body.username, req.body.password)
    }catch(err){
        next(err)
    }
})

 */

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
        console.log("%%%%%%%%%%%%%%%%",res.locals.user.username, req.params.username)
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
        if (res.locals.user.username != user.username) {
            throw new UnauthorizedError()
        }
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});


router.post("/:username/join/:group_id", ensureLoggedIn, async function (req, res, next) {
    try {
        const resp = await User.joinGroup(req.params.username, req.params.group_id);
        return res.status(201).json({ user_added: req.params.username, to_group: req.params.group_id })
    } catch (err) {
        next(err)
    }
});

router.post("/request/:recipient", ensureLoggedIn, async function (req, res, next) {
    try {
        if (!jsonschema.validate(req.json, invoiceSchema)) {
            throw new BadRequestError("invalid data")
        }
        const { recipient, payer, amount } = req.body;
        if (res.locals.user.username == req.params.recipient) {
            const invoice = await User.requestMoney(recipient, payer, amount);
            return res.json({ invoice });
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;