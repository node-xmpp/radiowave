// assertion
var assert = require('assert'),
    should = require('should'),
    winston = require('winston');

// configure logger before we load the Users module
winston.loggers.add('storage', {
    console: {
        label: 'storage',
        level: 'error',
        colorize: 'true'
    }
});

var UsrModule = require('../../storage/in-memory/Users');
var Users = new UsrModule();

var username = 'romeo';

describe('storage', function () {

    describe('channel subscribers', function () {

        var user = null;
        var channel = null;

        before(function (done) {
            Users.user(username).then(
                function (usr) {
                    user = usr;
                    user.createChannel('hello').then(function (newchannel) {
                        channel = newchannel;
                        done();
                    });
                },
                function (error) {
                    done(error);
                }
            );
        });

        it('subscribe', function (done) {
            var user = {
                'jid': 'romeo@shakespeare.lit',
                'content': {
                    'name': 'Romeo J.'
                }
            }

            var result = [{
                "content": {
                    "name": "Romeo J."
                },
                "jid": "romeo@shakespeare.lit"
            }];

            channel.subscribe(user.jid, user.content).then(function (success) {
                channel.listSubscribers().then(function (members) {
                    console.log(JSON.stringify(members));
                    members.should.not.be.empty;
                    assert.deepEqual(members, result);
                    done();
                });
            }, function (err) {
                done(err);
            });
        });

        it('subscribe', function (done) {
            var user = {
                'jid': 'julia@shakespeare.lit',
                'content': {
                    'name': 'Julia J.'
                }
            }

            var result = [{
                "content": {
                    "name": "Romeo J."
                },
                "jid": "romeo@shakespeare.lit"
            }, {
                "content": {
                    "name": "Julia J."
                },
                "jid": "julia@shakespeare.lit"
            }];

            channel.subscribe(user.jid, user.content).then(function (success) {
                channel.listSubscribers().then(function (members) {
                    console.log(JSON.stringify(members));
                    members.should.not.be.empty;
                    assert.deepEqual(members, result);
                    done();
                });
            }, function (err) {
                done(err);
            });
        });

        it('subscribers', function (done) {
            var result = [{
                "content": {
                    "name": "Romeo J."
                },
                "jid": "romeo@shakespeare.lit"
            }, {
                "content": {
                    "name": "Julia J."
                },
                "jid": "julia@shakespeare.lit"
            }];

            channel.listSubscribers().then(function (members) {
                console.log(JSON.stringify(members));
                members.should.not.be.empty;
                assert.deepEqual(members, result);
                done();
            }, function (err) {
                done(err);
            });
        });


        it('unsubscribe', function (done) {
            var result = [{
                "content": {
                    "name": "Julia J."
                },
                "jid": "julia@shakespeare.lit"
            }];

            channel.unsubscribe('romeo@shakespeare.lit').then(function (success) {
                channel.listSubscribers().then(function (members) {
                    console.log(JSON.stringify(members));
                    members.should.not.be.empty;
                    assert.deepEqual(members, result);
                    done();
                });
            });
        });

        it('subscribers', function (done) {
            var result = [{
                "content": {
                    "name": "Julia J."
                },
                "jid": "julia@shakespeare.lit"
            }];

            channel.listSubscribers().then(function (members) {
                console.log(JSON.stringify(members));
                members.should.not.be.empty;
                assert.deepEqual(members, result);
                done();
            }, function (err) {
                done(err);
            });
        });

    });

});