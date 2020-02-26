// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/

const mongoose = require('mongoose');
const Tool = require('../models/ToolModel.js');
const config = require('../config/config.js');

let tool = {
    image: 'test',
    keywords: ['test1', 'test2', 'test3']
}, id, db;

describe('Tool Schema Unit Tests', () => {
    describe('Saving to database', () => {

        beforeAll(async () => {
            db = await mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
            await mongoose.set('useCreateIndex', true);
            await mongoose.set('useFindAndModify', false);
            console.log(`established connection to db at uri: ${config.db.uri}!`);
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
                image: tool.image,
                keywords: tool.keywords
            }).save((err, tool) => {
                expect(err).toBeNull();
                id = tool._id;
                expect(id).not.toBeNull();
                expect(tool.image.data).toBe(Buffer("test".toString("binary"), "binary").data);
                expect(tool.keywords).toBe(['test1', 'test2', 'test3']);
                done();
            });
        }, 10000);

        test('throws an error when image not provided', async (done) => {
            await new Tool({
                keywords: tool.keywords
            }).save(err => {
                expect(err).not.toBeNull();
                done();
            });
        });

        test('throws an error when keywords not provided', async (done) => {
            await new Tool({
                image: tool.image
            }).save((err) => {
                expect(err).not.toBeNull();
                done();
            })
        });

    });
});
