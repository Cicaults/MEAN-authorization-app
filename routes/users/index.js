var express = require('express');
var router = express.Router();
var User = require('../../models/user'),
	jwt = require('jsonwebToken'),
	config = require('../../config/database.js'),
	passport = require('passport'),
	validateData = require('../../libs/validateData');

router.post('/register', (req, res, next) => {
	var newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			console.log(err.message);
			// Дубликат username
			if (err.name === 'MongoError' && err.code === 11000) {
				return res.json({success: false, msg: 'Такое имя пользователя уже существует'});
			// Ошибка при валидации данных
			} else if (err.name === 'ValidationError') {
				return res.json({success: false, msg: err.errors[Object.keys(err.errors)[0]].message});
			// Другая ошибка
			} else {
				return res.json({success: false, msg: err.message});
			}
		} else {
			return res.json({success: true, msg: "Регистрация прошла успешно!"});
		}
	});
});

router.post('/authenticate', (req, res, next) => {
	let username = req.body.username,
		password = req.body.password;

	if (!validateData(username) || !validateData(password)) {
		return res.json({success: false, msg: 'Логин или пароль не заданы'});
	}

	User.getUserByUsername(username, (err, user) =>{
		if (err) {
			return res.json({success: false, msg: "Ошибка сервера"});
		}

		if (!user) {
			return res.json({success: false, msg:"Пользователь не найден!"});
		}
		
		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) {
				return res.json({success: false, msg: "Ошибка сервера"});
			}

			if (isMatch) {
				var token = jwt.sign({payload: user}, config.secret, {expiresIn: 604800 }); 

				return res.json({
						success: true,
						token: 'JWT ' + token,
						user: {
							id: user._id,
							name: user.name,
							username: user.username,
							email: user.email
						}
					});
			} else {
				return res.json({success: false, msg: 'Неверный пароль'});
			}
		})
	})

});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user:req.user});
});



module.exports = router;