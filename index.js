const userRoute = require('./routes/userRoutes')
const adminroute = require('./routes/adminRoutes')
const session = require('express-session')
const mongoose = require("mongoose")
require('dotenv').config();
const nocache = require('nocache')
const express = require('express')
const app = express();
const morgan = require('morgan');
const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");



app.use(morgan('tiny'))
app.set('view engine', 'ejs')
app.use(nocache())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: uuid.v4(),
    resave: false,
    saveUninitialized: true,

}))


app.use('/', userRoute)

app.use('/admin', adminroute)

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server Started at http://localhost:${port}`);
})
