// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/

const mongoose = require('mongoose');
const Tool = require('../models/ToolModel.js');
const config = require('../config/config.js');

let toolInput = {
    image: 'test',
    keywords: ['test1', 'test2', 'test3']
}, id, db, expectedImage = Buffer.from(toolInput.image);

let retrievalData0 = {
        "retrievalTime": Math.ceil(Math.random() * 100),
        "retrievalDate": new Date(Date.now()),
        "user": "Drew"
     },
    retrievalData1 = {
        "retrievalTime": Math.ceil(Math.random() * 100),
        "retrievalDate": new Date(Date.now()),
        "user": "Gill"
    };


describe('Tool Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
        });

        afterEach(async () => {
            if (id) {
                await Tool.deleteOne({_id: id}).exec(() => {
                    id = null;
                });
            }
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });

        test('saves properly when binary data and keywords provided', async (done) => {
            await new Tool({
                image: toolInput.image,
                keywords: toolInput.keywords
            }).save((err, toolSave) => {
                expect(err).toBeNull();
                id = toolSave._id;
                expect(id).not.toBeNull();
                expect(Buffer.compare(toolSave.image, expectedImage)).toBe(0);
                expect(Array.from(toolSave.keywords)).toMatchObject(toolInput.keywords);
                done();
            });
        }, 10000);

        test('throws an error when image not provided', async (done) => {
            await new Tool({
                keywords: toolInput.keywords
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when keywords not provided', async (done) => {
            await new Tool({
                image: toolInput.image
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            })
        });

        test('saves properly when binary data, keywords, and retrievalHistory provided', async (done) => {
            let tool = new Tool({
                "image": toolInput.image,
                "keywords": toolInput.keywords,
                "retrievalHistory": [retrievalData0]
            });
            await tool.save((err, toolSave) => {
                expect(err).toBeNull();
                id = toolSave._id;
                expect(id).not.toBeNull();
                expect(Buffer.compare(toolSave.image, expectedImage)).toBe(0);
                expect(Array.from(toolSave.keywords)).toMatchObject(toolInput.keywords);

                expect(toolSave.retrievalHistory[0].retrievalTime).toBe(retrievalData0.retrievalTime);
                expect(toolSave.retrievalHistory[0].retrievalDate).toBe(retrievalData0.retrievalDate);
                expect(toolSave.retrievalHistory[0].user).toBe(retrievalData0.user);

                done();
            });
        }, 10000);

        test('saves properly when binary data, keywords, and retrievalHistory provided AND a retrievalHistory entry pushed', async (done) => {
            let tool = new Tool({
                "image": toolInput.image,
                "keywords": toolInput.keywords,
                "retrievalHistory": [retrievalData0]
            });

            tool.retrievalHistory.push(retrievalData1);

            await tool.save((err, toolSave) => {
                expect(err).toBeNull();
                id = toolSave._id;
                expect(id).not.toBeNull();
                expect(Buffer.compare(toolSave.image, expectedImage)).toBe(0);
                expect(Array.from(toolSave.keywords)).toMatchObject(toolInput.keywords);

                expect(toolSave.retrievalHistory[0].retrievalTime).toBe(retrievalData0.retrievalTime);
                expect(toolSave.retrievalHistory[0].retrievalDate).toBe(retrievalData0.retrievalDate);
                expect(toolSave.retrievalHistory[0].user).toBe(retrievalData0.user);

                expect(toolSave.retrievalHistory[1].retrievalTime).toBe(retrievalData1.retrievalTime);
                expect(toolSave.retrievalHistory[1].retrievalDate).toBe(retrievalData1.retrievalDate);
                expect(toolSave.retrievalHistory[1].user).toBe(retrievalData1.user);

                done();
            });
        }, 10000);

    });
});
