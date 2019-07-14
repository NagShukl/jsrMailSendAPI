//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const { validData, responses, invalidEmail } = require('./testData');
const expect = chai.expect;


chai.use(chaiHttp);


describe('/POST sendmail', () => {
    it('it should send mail (response 200) with valid data and content-type', (done) => {
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(validData))
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.success);
                done();
            });
    });
    it('it should send mail (response 200) without CC list', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.cc;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.success);
                done();
            });
    });
    it('it should send mail (response 200) without bCC list', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.bcc;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.success);
                done();
            });
    });
    it('it should send mail (response 200) without cc & bCC list', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.bcc;
        delete inputData.cc;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.success);
                done();
            });
    });
    it('it should respond 400, when data is valid but invalid content-type', (done) => {
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/xml')
            .send(JSON.stringify(validData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidRequest);
                done();
            });
    });
    it('it should respond 400, when body has no Subject', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.subject;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.noSubject);
                done();
            });
    });
    it('it should respond 400, when body has blank Subject', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.subject = '';
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.noSubject);
                done();
            });
    });
    it('it should respond 400, when body has no text', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.text;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.noContent);
                done();
            });
    });
    it('it should respond 400, when body has blank text', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.text;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.noContent);
                done();
            });
    });
    it('it should respond 400, when body has no from field', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.from;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.noFromField);
                done();
            });
    });
    it('it should respond 400, when body has from field but with invalid email', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.from.email;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidEmailInFrom);
                done();
            });
    });
    it('it should respond 400, when from field is with invalid email', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.from.email = 'nagendra.shukla.gmail.com';
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidEmailInFrom);
                done();
            });
    });
    it('it should respond 400 and error message, when To field is not available', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        delete inputData.to;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.missingTo);
                done();
            });
    });
    it('it should respond 400 and error message, when To email is not valid', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.to[0].email = invalidEmail;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidEmailinTo);
                done();
            });
    });
    it('it should respond 400 and error message, when CC email is not valid', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.cc[0].email = invalidEmail;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidEmailinCC);
                done();
            });
    });
    it('it should respond 400 and error message, when bCC email is not valid', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.bcc[0].email = invalidEmail;
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(responses.invalidEmailinBcc);
                done();
            });
    });
    it('it should respond 400 and error message, there is a duplicate email anywhere', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.bcc[0].email = 'nagendra.shukla@gmail.com';
        inputData.cc[0].email = 'nagendra.shukla@gmail.com';
        inputData.to[0].email = 'nagendra.shukla@gmail.com';
        const verifyObject = {
            errCode: '001',
            errMessage: 'nagendra.shukla@gmail.com Ids are duplicate in to, cc or bcc list.'
        }
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(verifyObject);
                done();
            });
    });
    it('it should respond 400 and error message, there is a duplicate email in to list', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.to[0].email = 'nagendra.shukla@gmail.com';
        inputData.to[1].email = 'nagendra.shukla@gmail.com';
        const verifyObject = {
            errCode: '001',
            errMessage: 'nagendra.shukla@gmail.com Ids are duplicate in to, cc or bcc list.'
        }
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(verifyObject);
                done();
            });
    });
    it('it should respond 400 and error message, there is a duplicate email in cc list', (done) => {
        const inputData = JSON.parse(JSON.stringify(validData));
        inputData.cc[0].email = 'nagendra.shukla@gmail.com';
        inputData.cc[1].email = 'nagendra.shukla@gmail.com';
        const verifyObject = {
            errCode: '001',
            errMessage: 'nagendra.shukla@gmail.com Ids are duplicate in to, cc or bcc list.'
        }
        chai.request(server)
            .post('/sendmail')
            .set('content-type', 'application/json')
            .send(JSON.stringify(inputData))
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(verifyObject);
                done();
            });
    });
    it('it should not send mail without a body', (done) => {
        const verifyObject = { errCode: '001', errMessage: 'Invalid Request!' }
        chai.request(server)
            .post('/sendmail')
            .send('')
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                res.body.should.be.eql(verifyObject);
                done();
            });
    });

});

describe('/GET sendmail', () => {
    it('it should response with 405 error', (done) => {
        chai.request(server)
            .get('/sendmail')
            .end((err, res) => {
                res.should.have.status(405);
                res.should.have.header('content-type', 'text/html');
                done();
            });
    });
});
describe('/GET for any route ', () => {
    it('it should response with 405 error', (done) => {
        chai.request(server)
            .get('/sendmail1')
            .end((err, res) => {
                res.should.have.status(405);
                res.should.have.header('content-type', 'text/html');
            });
        chai.request(server)
            .get('/hello')
            .end((err, res) => {
                res.should.have.status(405);
                res.should.have.header('content-type', 'text/html');
                done();
            });
    });
});
describe('/POST for route other then /sendmail', () => {
    it('it should response with 404 error', (done) => {
        chai.request(server)
            .post('/hello')
            .send('')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.have.header('content-type', 'text/html');
                done();
            });
    });
});

