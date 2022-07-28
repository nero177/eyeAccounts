const express = require('express');
const app = express();

const router = require('./routers/router');
const userAccountRouter = require('./routers/userAccountRouter');
const adminRouter = require('./routers/adminRouter');
const apiRouter = require('./routers/apiRouter');
const authRouter = require('./routers/authRouter');

require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(express.json());

/* routers */

app.use('/auth', authRouter)
app.use('/userAccount', userAccountRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', router);

/* /routers */

app.set('trust proxy', true)

app.listen(PORT, async() => {
    console.log(`Bound to port ${PORT}`);

    try {
        return await mongoose.connect(process.env.MONGO_URL)
    } catch (err) {
        console.log(err)
    }
})