const clearAndRefill = require('../ResetDatabase.js');

describe('Refilling database', () => {
    test('deleting all documents and resetting', async (done) => {
        expect.assertions(1);
        try {
            await clearAndRefill();
        } catch (e) {
            expect(e).toMatch('error');
        }
    }, 300000);
});