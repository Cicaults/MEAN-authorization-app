var jwtStrategy = require('passport-jwt').Strategy,
	extractJwt = require('passport-jwt').ExtractJwt,
	User = require('../models/user.js'),
	config = require('./database.js');

module.exports = function (passport) {
	var opts = {};
	opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = config.secret;
	passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
		User.getUserById(jwt_payload.payload._id, (err, user) => {
			if (err) {
				return done(err, false);
			}

			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	}))
}
