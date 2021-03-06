var thinky = require('thinky')();
var type = thinky.type;
var bcrypt = require('bcrypt');


var User = thinky.createModel('user', {

	username        : type.string(),
	password        : type.string()

});


User.pre('save', function(next) {

  var self = this;

  bcrypt.genSalt(10, function (err, salt) {

    if(err) return next(err);
    bcrypt.hash(self.password, salt, function (err, hash) {

      if(err) return next(err);
      self.password = hash;
      next();

    });
  });
});


User.comparePassword = function(password, user, callback) {

  bcrypt.compare(password, user.password, function(err, match) {

    if (err) callback(err);

    if (match) {
      callback(null, true);
    } else {
      callback(err);
    }
  });
}


module.exports = User;