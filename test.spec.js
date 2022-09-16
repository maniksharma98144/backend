const supertest = require("supertest");
const expect = require('chai').expect;

describe('API testing', () => {
    const baseurl = "http://localhost:80/api";
    let token;
    let id;
    it('signUp user', (done) => {
        supertest(baseurl)
            .post('/users/signUp')
            .send({ firstName: 'first', lastName: 'last', userId: 'userId@gmail.com', password: 'password' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body._user).not.to.be.null;
                token = res.body._user;
                done();
            })
    })
    it('add tweet', (done) => {
        supertest(baseurl)
            .put('/tweets/add')
            .send({ text: 'abc' })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
    })
    it('get all the tweets', (done) => {
        supertest(baseurl)
            .get('/tweets/getAll')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.modifiedAt).not.to.be.null;
                id = res.body[0]._id;
                done();
            })
    })
    it('get tweet by id', (done) => {
        supertest(baseurl)
            .get('/tweets/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.modifiedAt).not.to.be.null;
                expect(res.body.text).not.to.be.null;
                done();
            })
    })
    it('update tweet', (done) => {
        supertest(baseurl)
            .post('/tweets/update')
            .send({
                _id: id,
                text: 'manik'
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
    })
    it('delete tweet', (done) => {
        supertest(baseurl)
            .delete('/tweets/delete/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
    })
})