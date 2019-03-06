const chai = require('chai');
const expect = chai.expect;
const githubUser = require('../controllers/github-user');
const sinon = require('sinon');
const axios = require('axios');

describe('Github users - UT', () => {

    describe('getUsers()', () => {
        let apiGithub;

        beforeEach(function () {
            apiGithub = sinon.stub(axios, 'get');
        });

        afterEach(function () {
            apiGithub.restore();
        });

        it('get users github - success', (done) => {

            apiGithub.resolves({
                "status": 200,
                "data": {
                    "total_count": 35539733,
                    "incomplete_results": true,
                    "items": [
                        {
                            "login": "yyx990803",
                            "id": 499550,
                            "node_id": "MDQ6VXNlcjQ5OTU1MA==",
                            "avatar_url": "https://avatars1.githubusercontent.com/u/499550?v=4",
                            "gravatar_id": "",
                            "url": "https://api.github.com/users/yyx990803",
                            "html_url": "https://github.com/yyx990803",
                            "followers_url": "https://api.github.com/users/yyx990803/followers",
                            "following_url": "https://api.github.com/users/yyx990803/following{/other_user}",
                            "gists_url": "https://api.github.com/users/yyx990803/gists{/gist_id}",
                            "starred_url": "https://api.github.com/users/yyx990803/starred{/owner}{/repo}",
                            "subscriptions_url": "https://api.github.com/users/yyx990803/subscriptions",
                            "organizations_url": "https://api.github.com/users/yyx990803/orgs",
                            "repos_url": "https://api.github.com/users/yyx990803/repos",
                            "events_url": "https://api.github.com/users/yyx990803/events{/privacy}",
                            "received_events_url": "https://api.github.com/users/yyx990803/received_events",
                            "type": "User",
                            "site_admin": false,
                            "score": 1
                        },
                        {
                            "login": "gaearon",
                            "id": 810438,
                            "node_id": "MDQ6VXNlcjgxMDQzOA==",
                            "avatar_url": "https://avatars0.githubusercontent.com/u/810438?v=4",
                            "gravatar_id": "",
                            "url": "https://api.github.com/users/gaearon",
                            "html_url": "https://github.com/gaearon",
                            "followers_url": "https://api.github.com/users/gaearon/followers",
                            "following_url": "https://api.github.com/users/gaearon/following{/other_user}",
                            "gists_url": "https://api.github.com/users/gaearon/gists{/gist_id}",
                            "starred_url": "https://api.github.com/users/gaearon/starred{/owner}{/repo}",
                            "subscriptions_url": "https://api.github.com/users/gaearon/subscriptions",
                            "organizations_url": "https://api.github.com/users/gaearon/orgs",
                            "repos_url": "https://api.github.com/users/gaearon/repos",
                            "events_url": "https://api.github.com/users/gaearon/events{/privacy}",
                            "received_events_url": "https://api.github.com/users/gaearon/received_events",
                            "type": "User",
                            "site_admin": false,
                            "score": 1
                        }
                    ]
                }
            });

            const reqStub = {
                query: {
                    offset: 1,
                    limit: 15,
                    location: 'brazil',
                    followers: 100,
                    language: 'java'
                }
            }

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(200);
                return resMock.status;
            };

            resMock.status.send = (send) => {
                expect(send).to.have.property("total_count", 35539733);
                expect(send.items[0]).to.have.property("login", "yyx990803");
                expect(send.items[0]).to.have.property("id", 499550);
                expect(send.items[0]).to.have.property("url", "https://api.github.com/users/yyx990803");
                done();
            };

            const nextSub = null;

            githubUser.getUsers(reqStub, resMock, nextSub);
        });

        it('get users github - bad request', (done) => {
            apiGithub.resolves({
                "status": 400
            });

            const reqStub = {
                query: {
                    offset: 'abc',
                    limit: 15,
                    location: 'brazil',
                    followers: 100,
                    language: 'java'
                }
            }

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(400);
                return resMock.status;
            };

            resMock.status.send = (send) => {
                expect(send).to.deep.equal({message: "Github users bad request"});
                done();
            };

            const nextSub = null;

            githubUser.getUsers(reqStub, resMock, nextSub);

        });

        it('get users github - not found', (done) => {
            apiGithub.resolves({
                "status": 404
            });

            const reqStub = {
                query: {
                    offset: 1,
                    limit: 15,
                    location: 'brazil',
                    followers: 10000000000,
                    language: 'java'
                }
            }

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(404);
                return resMock.status;
            };

            resMock.status.send = (send) => {
                expect(send).to.deep.equal({message: "Github users not found"});
                done();
            };

            const nextSub = null;

            githubUser.getUsers(reqStub, resMock, nextSub);

        });    
        
        it('get users github - internal server error', (done) => {
            apiGithub.rejects({});

            const reqStub = {
                query: {
                    offset: 1,
                    limit: 15,
                    location: 'brazil',
                    followers: 1,
                    language: 'java'
                }
            }

            const resMock = {};

            resMock.status = (statusCode) => {
                expect(statusCode).to.equal(500);
                return resMock.status;
            };

            resMock.status.send = (send) => {
                expect(send).to.have.property("message", "Internal server error");
                done();
            };

            const nextSub = null;

            githubUser.getUsers(reqStub, resMock, nextSub);

        });

    });
});