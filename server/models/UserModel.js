const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 10;
const LOCK_TIME = 60 * 1000 //1 minute in milliseconds. Subject to change

//authentication code derived from https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
//further authentication from http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },

    loginAttempts: { type: Number, required: true, default: 0}, //how many consecutive failures to login
    lockUntil: {type: Date} //a timestamp indicating when we can can stop ignoring login attempts (after many failures)
});

//a virtual is a computed property NOT stored on the database
UserSchema.virtual('isLocked').get(function(){
    //check for a future lockUntil timestamp and if that is past the current date.
    return !!(this.lockUntil && this.lockUntil > new Date( Date.now() ) );
})

UserSchema.pre('save', function(next){
    let user = this;

    //only hash password if it is modified/new
    if(!user.isModified('password')){
        return next;
    }

    //generate a salt for bcrypt password encryption
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        //hash the password with the generated salt
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            //replace the plaintext password with a hashed password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.incLoginAttempts = function(cb){
    //if the previous lock has expired, restart at 1
    if(this.lockUntil && this.lockUntil < new Date(Date.now())){
        return this.update({
            $set: { loginAttempts: 1}, //sets this field to 1
            $unset: {lockUntil: 1} // deletes this field
        }, cb);
    }
    //otherwise, increment.
    let updates = { $inc: {loginAttempts: 1} }; //increment loginAttempts

    //lock the account if the max attempts has been reached, and it's not already locked.
    if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked){
        updates.$set = {lockUntil: Date.now() + LOCK_TIME};
    }

    return this.update(updates, cb);
}

//expose this enum on the model.
let reasons = UserSchema.statics.failedLogin = {
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2,
    NOT_FOUND: 3
};

//this is the main method for authenticating a user in the database
//to use, call the UserSchema (or whatever it is imported as) method with arguments of the candidate username/password
//Ex: User.getAuthenticated("testUsername", "testPassword", function(err, user, reason)){}
//If successful, reason == null in the callback, and user != null. The returned user is the correct user in the database.
//If unsucessful, the reason will be listed as a number (enum above)
UserSchema.statics.getAuthenticated = function(username, password, cb){
    this.findOne({ username: username}, function(err, user){
        if(err) return cb(err);

        //see if the user exists
        if(!user){
            return cb(null, null, reasons.NOT_FOUND);
        }

        //see if the account is locked
        if(user.isLocked){
            //increment bad login attempts
            return user.incLoginAttempts(function(err){
                if (err) return cb(err);

                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }

        //see if password matches
        user.comparePassword(password, function(err, isMatch){
            if (err) return cb(err);

            //did the passwords match?
            if(isMatch){
                //if there's no lock or failed login attempts, return the user
                if(!user.loginAttempts && !user.lockUntil) return cb(null, user);

                //else, reset that info.
                let updates = {
                    $set: {loginAttempts: 0},
                    $unset: {lockUntil: 1}
                };

                return user.update(updates, function(err){
                    if(err) return cb(err);
                    return cb(null, user);
                });
            }


            //if the password was incorrect, increment bad login attempts before response
            user.incLoginAttempts(function(err){
                if(err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });   
    });
};
    
let User = mongoose.model('users', UserSchema);
module.exports = User;