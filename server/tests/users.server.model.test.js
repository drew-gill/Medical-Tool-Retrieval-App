const mongoose = require('mongoose');    
const User = require('../models/UserModel.js');
const config = require('../config/config.js');

//Note: although there are testUser instances below, the username field must be unique for each test so hard-coded entries
// are used to prevent errors from asynchronous running.
//the main testuser instance
let testUser0 = new User({
    username: "__test__admin123",
    password: "password1"
});


//used for duplicate username testing
let testUser1 = new User({
    username: "__test__admin123",
    password: "32Sdfyadfcvbjcand"
});

let id, db;

describe('User Schema Unit Tests', () => {

    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);

            //delete any pre-existing users with a username containing "__test__"
            await User.deleteMany({ username: /__test__/}, function (err) {
                if(err) throw err;
            });
        });

        afterEach(async () => {
            if (id) {
                await User.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        test('throws an error when username field is incomplete', async(done) => {
            await new User({
                password: testUser0.password
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when password field is incomplete', async(done) => {
            await new User({
                username: "__test__2"
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            });
        });


        test('saves properly when unique username and any password is supplied', async (done) => {
            let user = new User({
                username: "__test__3",
                password: testUser0.password
            });
            await user.save((err, userSave) => {
                expect(err).toBeNull();
                id = userSave._id;
                expect(id).not.toBeNull();
                expect(userSave.username).toBe("__test__3");

                //use the usermodel method of compare password to see if the candidatepassword matches the hashed password in the DB.
                userSave.comparePassword(testUser0.password, function(err, isMatch){
                    if(err) throw err;
                    expect(isMatch).toBe(true);
                });
                done();
            });
        });


        test('throws an error when username field is duplicated', async(done) => {
            await new User({
                username: testUser0.username,
                password: testUser0.password
            }).save((err, userSave) => {
                if(err) return err;
                expect(err).toBeNull();
                id = userSave._id;

                //create another user with the same username, after the first user saves.
                new User({
                    username: testUser1.username,
                    password: testUser1.password
                }).save((err) => {
                    expect(err).not.toBeNull();
                    done();
                });
            });
        });


        afterAll(async () => {
            //delete any users that have a username containing "__test__"
            await User.deleteMany({ username: /__test__/}, function (err) {
                if(err) throw err;
            });

            await mongoose.connection.close();
        });
    });
});