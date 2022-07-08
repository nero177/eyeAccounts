const express = require('express');
const app = express();
const router = require('./routers/router');
const userAccountRouter = require('./routers/userAccountRouter');
const adminRouter = require('./routers/adminRouter');
const apiRouter = require('./routers/apiRouter');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const config = require('./config');;

app.use(cookieParser());
app.use(express.static('static'));
app.set('view engine', 'ejs');

/* routes */
app.use('/userAccount', userAccountRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', router);
/* /routes */

app.set('trust proxy', true)

app.listen(PORT, async() => {
    console.log(`Bound to port ${PORT}`);

    try {
        return await mongoose.connect(config.mongoDBUrl)
    } catch (err) {
        console.log(err)
    }
})