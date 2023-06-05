const express = require('express')
const cors = require('cors')
const app = express();
const {NotFoundError} = require("./ExpressError.js")
const { authenticateJWT } = require("./middleware/auth");


const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth");
const groupRoutes = require('./routes/groups.js')
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
  module.exports = app;