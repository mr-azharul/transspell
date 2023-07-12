const request = require('supertest');
const app = require('../app');

describe('App', () => {
    it("Should run tests", () => {
        expect(true).toBe(true);
    });

    it("Should Return Hello World", (done) => {
        request(app).get('/').expect('Hello World', done);
    });
    
});
