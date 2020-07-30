const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.moddleware');
const userRouter = require('./routes/user.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// Needed for the req.body!!
app.use(express.json());
// Use cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use('/user', userRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;