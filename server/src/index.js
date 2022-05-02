const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 5000;
const route = require('./routes');
const db = require('./config/db');
const cors = require('cors');
const methodOverride = require('method-override');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//Cors
app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

//Body parser
app.use(express.json());

app.use(methodOverride('_method'));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
    sessions({
        secret: '4ac9114255fd9a50c0deecac384930eee75aaedff05939f929cb970a8c5968b4',
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    }),
);

// cookie parser middleware
app.use(cookieParser());

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            dateFormat: (date, options) => {
                if (date == null) return ' ';
                const formatToUse =
                    (arguments[1] &&
                        arguments[1].hash &&
                        arguments[1].hash.format) ||
                    options;
                return moment(date).format(formatToUse);
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
