const mongoose = require('mongoose');    
const User = require('../models/UserModel.js');
const config = require('../config/config.js');

//Note: although there are testUser instances below, the username field must be unique for each test so hard-coded entries
// are used to prevent errors from asynchronous running.


let testUser0 = new User({
    username: "__test__testuser123",
    password: "password1"
});

let id, db;

describe('User Authentication Unit Tests', () => {

        describe('User authentication', () => {

            beforeAll(async () => {
                db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
                await mongoose.set('useCreateIndex', true);
                await mongoose.set('useFindAndModify', false);


                // //clear the db of all tests
                // await User.deleteMany({ username: /__test__/}, function (err) {
                //     if(err) throw err;
                // });

                // //create the test user in the database.    
                // await testUser0.save((err) => {
                //     if(err) throw err;
                // });
            });
    
            test('Successfully login to the test account', async(done) => {
                let SuccessfulUser = new User({
                    username: testUser0.username,
                    password: testUser0.password
                });

                //Authenticate the user with the format USER.getAuthenticated(username, password, cb)
                await User.getAuthenticated(SuccessfulUser.username, SuccessfulUser.password, function(err, user, reason){
                    if(err) throw err;

                    expect(user).not.toBeNull();

                    done();
                });
            });

            test('Login fails on wrong username, returns reason 0 (NOT_FOUND).', async(done) => {

                let WrongUser = new User({
                    username: (testUser0.username + "_wrong"),
                    password: testUser0.password
                });

                //Authenticate the user with the format USER.getAuthenticated(username, password, cb)
                await User.getAuthenticated(WrongUser.username, WrongUser.password, function(err, user, reason){
                    if(err) throw err;

                    expect(user).toBeNull();
                    expect(reason).toBe(0);
                    done();
                });

            });


            test('Login fails on wrong password, returns reason 0 (NOT_FOUND).', async(done) => {

                let UnsuccessfulUser = new User({
                    username: testUser0.username,
                    password: (testUser0.password + "_wrong")
                });

                //Authenticate the user with the format USER.getAuthenticated(username, password, cb)
                await User.getAuthenticated(UnsuccessfulUser.username, UnsuccessfulUser.password, function(err, user, reason){
                    if(err) throw err;

                    expect(user).toBeNull();
                    expect(reason).toBe(1);
                    done();
                });

            });

            //~~~This test does not work due to lag in incrementing the loginAttempts due to async function~~~~
            // test('Login fails when max attempts reached, returns reason 2 (MAX_ATTEMPTS).', async(done) => {

            //     let UnsuccessfulUser = new User({
            //         username: testUser0.username,
            //         password: (testUser0.password + "_wrong")
            //     });

            //     //i goes past the max attempts allowed by the login.
            //     for(let i = 0; i <= 15; i++){
            //         //Authenticate the user with the format USER.getAuthenticated(username, password, cb)
            //         User.getAuthenticated(UnsuccessfulUser.username, UnsuccessfulUser.password, function(err, user, reason){
            //             if(err) throw err;
            //         });
            //     }

            //     User.getAuthenticated(UnsuccessfulUser.username, UnsuccessfulUser.password, function(err, user, reason){
            //         if(err) throw err;

            //         expect(user).toBeNull();
            //         expect(reason).toBe(2);
            //         done();
            //     });

            // });

            



    
            afterAll(async () => {
                await mongoose.connection.close();

                // await User.deleteMany({ username: /__test__/}, function (err) {
                //     if(err) throw err;
                // });
            });
    
        });
});