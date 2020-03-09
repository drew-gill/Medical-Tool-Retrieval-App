// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/

const mongoose = require('mongoose');
const Retrieval = require('../models/RetrievalModel.js');
const config = require('../config/config.js');

let retrievalInput = {
    toolID: 'ID_TEST',
    timeForRetrieval: 50,
    user: "USER_TEST"
}, id, db;

describe('Tool Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
        });

        afterEach(async () => {
            if (id) {
                await Retrieval.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        test('saves properly when toolID, timeForRetrieval, and user provided', async (done) => {
            await new Retrieval({
                toolID: retrievalInput.toolID,
                timeForRetrieval: retrievalInput.timeForRetrieval,
                user: retrievalInput.user
            }).save((err, retrievalSave) => {
                expect(err).toBeNull();
                id = retrievalSave._id;
                expect(id).not.toBeNull();
                expect(retrievalSave.toolID).toBe(retrievalInput.toolID);
                expect(retrievalSave.timeForRetrieval).toBe(retrievalInput.timeForRetrieval);
                expect(retrievalSave.user).toBe(retrievalInput.user);
                done();
            });
        }, 10000);


        
        test('saves properly when toolID and timeForRetrieval provided, user not provided', async (done) => {
            await new Retrieval({
                toolID: retrievalInput.toolID,
                timeForRetrieval: retrievalInput.timeForRetrieval
            }).save((err, retrievalSave) => {
                expect(err).toBeNull();
                id = retrievalSave._id;
                expect(id).not.toBeNull();
                expect(retrievalSave.toolID).toBe(retrievalInput.toolID);
                expect(retrievalSave.timeForRetrieval).toBe(retrievalInput.timeForRetrieval);
                expect(retrievalSave.user).toBe(undefined);
                done();
            });
        }, 10000);


        test('throws an error when toolID not provided', async (done) => {
            await new Retrieval({
                timeForRetrieval: retrievalInput.timeForRetrieval,
                user: retrievalInput.user
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when timeForRetrieval not provided', async (done) => {
            await new Retrieval({
                toolID: retrievalInput.toolID,
                user: retrievalInput.user
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            })
        });


    });
});
