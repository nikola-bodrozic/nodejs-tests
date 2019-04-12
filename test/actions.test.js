"use-strict";

const { expect } = require("code");
const lab = require("lab").script();
exports.lab = lab;
const sinon = require("sinon");

const actions = require("../src/actions");
const UsersDao = require("../src/usersDao");

let userDaoStub;

// testing method
lab.experiment("Class Users", () => {
  lab.beforeEach(() => {
    userDaoStub = sinon.stub(UsersDao.prototype, "getUserLocation");
  });

  lab.afterEach(() => {
    userDaoStub.restore();
  });

  lab.test("should stub userDao.getUser() with arg 5 and return object", () => {
    userDaoStub.returns({ lat: "-1.3159", lng: "43.1496" });
    const val = actions.showUser(5);
    expect(val).to.equal({ lat: "-1.3159", lng: "43.1496" });
    expect(userDaoStub.getCall(0).args[0]).to.equal(5);
    expect(userDaoStub.getCall(1).args[0]).to.equal(5);
    expect(userDaoStub.calledTwice).to.be.equal(true);
  });

  lab.test("should stub userDao.getUser() with fake function", () => {
    userDaoStub.callsFake(() => "bar");
    const val = actions.showUser(7);
    expect(val).to.equal("bar");
  });

  // verify that arg was passed to stub and stub returned value
  lab.test("should stub userDao.getUser() by passing arg = 48", () => {
    userDaoStub.withArgs(45).returns("some arg");
    userDaoStub.withArgs(48).returns("some other arg");
    const val = actions.showUser(48);
    expect(val).to.equal("some other arg");
  });
});

// testing promises
lab.experiment("Promises", () => {
  lab.test("should resolve promise to `resolved` string", async () => {
    expect(await actions.handlePromise(0.7)).to.be.equal("resolved");
  });
  lab.test("should reject promise to `rejected` string", async () => {
    expect(await actions.handlePromise(0.3)).to.be.equal("rejected");
  });
});
