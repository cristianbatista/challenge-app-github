const chai = require('chai');
const expect = chai.expect;
const user = require('../controllers/user');
const sinon = require('sinon');
var userModel = require('../models').user;

describe('User - UT', () => {

    describe('create()', () => {

        let userCreateStub;

        beforeEach(function () {
            userCreateStub = sinon.stub(userModel, 'create');
        });

        afterEach(function () {
            userCreateStub.restore();
        });


        it('create user - success', (done) => {

            //mock result user.create
            userCreateStub.resolves({});

            // Stub req
            const reqStub = {
                body: {
                    username: "joao",
                    name: "joao da silva",
                    password: "123"
                }
            };

            // Mock res
            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(201);
                return resMock.status;
            };
            resMock.status.send = (send) => {
                expect(send).to.deep.equal({ message: "User createad" });
                done();
            };

            // Stub next
            const nextStub = null;

            // Run unit under test
            user.create(reqStub, resMock, nextStub);
        });

        it('create user - error', (done) => {

            //mock result user.create
            userCreateStub.rejects({});

            // Stub req
            const reqStub = {
                body: {
                    username: "joao"
                }
            };

            // Mock res
            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(400);
                return resMock.status;
            };
            resMock.status.send = (send) => {
                expect(send).to.have.property("message", "Failed to process request");
                done();
            };

            // Stub next
            const nextStub = null;

            // Run unit under test
            user.create(reqStub, resMock, nextStub);
        });
    });

    describe('authenticate()', () => {
        let userAuthenticateFindAllStub;
        let userAuthenticateUpdateStub;

        beforeEach(function () {
            userAuthenticateFindAllStub = sinon.stub(userModel, 'findAll');
            userAuthenticateUpdateStub = sinon.stub(userModel, 'update');
        });

        afterEach(function () {
            userAuthenticateFindAllStub.restore();
            userAuthenticateUpdateStub.restore();
        });

        it('authenticate user - success', (done) => {

            userAuthenticateFindAllStub.resolves([
                new userModel({
                    username: "joao",
                    password: "Y2JzMTIz"
                })
            ]);

            userAuthenticateUpdateStub.returns('Ok')

            const reqStub = {
                body: {
                    username: "joao",
                    password: "Y2JzMTIz"
                }
            };

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(200);
                return resMock.status
            };

            resMock.status.send = (send) => {
                expect(send).to.deep.equal({message: "Login successful"});
                done();
            };

            const nextStub = null;

            user.authenticate(reqStub, resMock, nextStub);            

        });

        it('authenticate user - user not found', (done) => {

            userAuthenticateFindAllStub.resolves([]);

            const reqStub = {
                body: {
                    username: "joao",
                    password: "Y2JzMTIz"
                }
            };

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(404);
                return resMock.status
            };

            resMock.status.send = (send) => {
                expect(send).to.deep.equal({message: "User not found"});
                done();
            };

            const nextStub = null;

            user.authenticate(reqStub, resMock, nextStub);            

        });        

        it('authenticate user - Invalid password', (done) => {

            userAuthenticateFindAllStub.resolves([
                new userModel({
                    username: "joao",
                    password: "Y2JzMTIz"
                })
            ]);

            const reqStub = {
                body: {
                    username: "joao",
                    password: "123"
                }
            };

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(404);
                return resMock.status
            };

            resMock.status.send = (send) => {
                expect(send).to.deep.equal({message: "Invalid password"});
                done();
            };

            const nextStub = null;

            user.authenticate(reqStub, resMock, nextStub);            

        });          

        it('authenticate user - catch error', (done) => {

            userAuthenticateFindAllStub.rejects({});

            const reqStub = {
                body: {
                    username: "joao",
                    password: "123"
                }
            };

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(500);
                return resMock.status
            };

            resMock.status.send = (send) => {
                expect(send).to.have.property("message", "Internal Server Error");
                done();
            };

            const nextStub = null;

            user.authenticate(reqStub, resMock, nextStub);            

        });                  
    });
});    