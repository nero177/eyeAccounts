const express = require('express');
const app = express();
const router = require('./routers/router');
const userAccountRouter = require('./routers/userAccountRouter');
const adminRouter = require('./routers/adminRouter');
const mongoose = require('mongoose');
const config = require('./config');
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use('/userAccount', userAccountRouter);
app.use('/admin', adminRouter);
app.use('/', router);
app.get('/', (req, res) => res.send('sdfsdf'))


app.listen(PORT, async() => {
    console.log('Bound to port 3000');
    try {
        return await mongoose.connect(config.mongoDBUrl)
    } catch (err) {
        console.log(err)
    }
})