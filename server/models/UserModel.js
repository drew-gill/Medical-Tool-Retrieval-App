const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//authentication code derived from https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

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
    
let User = mongoose.model('users', UserSchema);
module.exports = User;