"use-strict";

const { expect } = require("code");
const lab = require("lab").script();
exports.lab = lab;
const sinon = require('sinon');

const actions = require("../src/actions");
const UsersDao = require('../src/usersDao');

let userDaoStub

lab.experiment("Promises", ()=>{
  lab.test("should resolve promise to `resolved` string", async () => {
    expect(await actions.handlePromise(0.7)).to.be.equal("resolved");
  });
  lab.test("should reject promise to `rejected` string", async () => {
    expect(await actions.handlePromise(0.3)).to.be.equal("rejected");
  });
})

lab.experiment("Class Users", () => {

  lab.test("should stub userDao.getUser()", async () => {
    actions.showUser()
    
	  userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation').returns({ lat: '-1.3159', lng: '43.1496' })
    const val1 = actions.showUser(5)
    expect(val1).to.equal({ lat: '-1.3159', lng: '43.1496' })
    expect(userDaoStub.getCall(0).args[0]).to.be.a.number();
    expect(userDaoStub.getCall(0).args[0]).to.equal(5)
    expect(userDaoStub.calledOnce).to.be.equal(true);
    userDaoStub.restore()

    userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation').callsFake (() => 'bar');
    const val2 = actions.showUser(7)
    expect(val2).to.equal('bar')
    expect(userDaoStub.calledOnce).to.be.equal(true);
    userDaoStub.restore()

    userDaoStub = sinon.stub(UsersDao.prototype, 'getUserLocation')
    userDaoStub.withArgs(45).returns('some arg');
    userDaoStub.withArgs(48).returns('some other arg');
    const val3 = actions.showUser(48)
    expect(val3).to.equal('some other arg')
    expect(userDaoStub.calledOnce).to.be.equal(true);
	  userDaoStub.restore()
  });

});
