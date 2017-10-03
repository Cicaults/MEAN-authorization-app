var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	config = require('./config/database');

var app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

// Клиентская часть
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = Promise;
mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('connected', () => {
	console.log("Connected to database " + config.database);
});
mongoose.connection.on('error', (err) => {
	console.log("Database Error" + err);
});

var users = require('./routes/users');
app.use('/users', users);

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запасная обработка 404
app.use((req, res, next) => {
	res.format({
		text: () => {
			res.status(404).send('Ошибка 404. Страница не найдена');
		},
		html: () => {
			res.status(404).send('<h1>Ошибка 404.<br/>Страница не найдена</h1>');
		},
		json: () => {
			res.status(404).send({statusCode: 404, message: 'Ошибка 404. Страница не найдена'});
		}
	});

});

// Необработанная ошибка
app.use(function (err, req, res, next) {
  res.status(500).end("500 Internal Server Error");
});



app.listen(port, () => {
	console.log('Server running on port ' + port);
});



