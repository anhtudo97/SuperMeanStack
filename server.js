const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./app/models/user');

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/tutorial', (err) => {
    if (err) {
        console.log('Not connected to the database ' + err)
    } else {
        console.log('Successfully connected to MongoDb')
    }
})

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('abc');
})

// http://localhost:8000/users
app.post('/users', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    if (req.body.username == null || req.body.username == '' ||
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == '') {
        res.send('Ensure username, password, email were provided')
    } else {
        user.save((err) => {
            if (err) {
                res.send('Username or email is existing')
            } else {
                res.send('User is created')
            }
        });
    }

})

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})