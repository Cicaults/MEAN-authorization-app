var mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
config = require('../config/database.js'),
validator = require('../libs/validateData');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Укажите имя"],
		maxlength: [128, "Максимальная длина имени 128 символов"],
		minlength: [1, "Минимальная длина имени 1 символ"],
		validate: [validator, "Некорректно задано имя"]
	},
	email: {
		type: String,
		required: [true, "Укажите email"],
		maxlength: [256, "Максимальная длина email 256 символов"],
		minlength: [3, "Минимальная длина email 3 символа"],
		validate: [validator, "Некорректно задан email"]
	},
	username: {
		type: String,
		required: [true, "Укажите имя пользователя"],
		maxlength: [128, "Максимальная длина имени пользователя 128 символов"],
		minlength: [1, "Минимальная длина имени пользователя 1 символ"],
		validate: [validator, "Некорректно задано имя пользователя"],
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: [true, "Укажите пароль"]
	},
	createdAt: {
		type: Date
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback)
}

module.exports.getUserByUsername = function (username, callback) {
	var query = {username: username.toLowerCase()};
	User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
	// Проверка пароля до хэширования
	if (!validator(newUser.password)) {
		return callback(new Error("Некорректно задан пароль", null));
	}
	if (newUser.password.trim().length <= 3) {
		return callback(new Error("Минимальная длина пароля 3 символа"), null);
	}
	bcrypt.genSalt(10,(err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) {
				return callback(err, null);
			}
			newUser.password = hash;
			newUser.createdAt = new Date();
			newUser.save(callback);
		});
	});

}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) {
			callback(err, false);
		}
		callback(null, isMatch);
		
	})
}