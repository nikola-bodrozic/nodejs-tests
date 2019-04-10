"use-strict";

const { expect } = require("code");
const lab = require("lab").script();
exports.lab = lab;
const sinon = require('sinon');

const actions = require("../src/actions");
const UsersDao = require('../src/usersDao');

let userDaoStub

lab.experiment("Actions", () => {

  lab.test("should resolve promise to `resolved` string", async () => {
    expect(await actions.handlePromise(0.7)).to.be.equal("resolved");
  });

  lab.test("should reject promise to `rejected` string", async () => {
    expect(await actions.handlePromise(0.3)).to.be.equal("rejected");
  });

  lab.test("should stub userDao.getUser()", async () => {
    actions.showUser()
    
	  userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation').returns({ lat: '-1.3159', lng: '43.1496' })
    actions.showUser()
    userDaoStub.restore()

    userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation').callsFake (() => 'bar');
    actions.showUser()
    userDaoStub.restore()

    userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation')
    userDaoStub.withArgs(45).returns('some arg');
    userDaoStub.withArgs(48).returns('some other arg');
    actions.showUser(48)
    
    expect(userDaoStub.calledOnce).to.be.equal(true);
	  userDaoStub.restore()
  });

});
