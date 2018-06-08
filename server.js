const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const social = require('./app/passport/passport')(app, passport);

const router = express.Router();
const appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/tutorial', err => {
    if (err) {
        console.log('Not connected to the database ' + err);
    } else {
        console.log('Successfully connected to MongoDb');
    }
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});