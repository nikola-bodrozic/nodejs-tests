"use strict";

const UsersDao = require("./usersDao");
const userDao = new UsersDao();

const handlePromise = (p = Math.random()) => {
  return new Promise((resolve, reject) => {
    if (p > 0.5) 
      setTimeout(() => resolve("resolved"), 1000);
    else 
      setTimeout(() => reject("rejected"), 1500);
  })
    .then(res => res)
    .catch(err => err);
};

const showUser = p => {
  console.log(userDao.getUserLocation(p));
  return userDao.getUserLocation(p);
};

// call async method and extract data
userDao.getUserLocation2().then(result => {
  console.log(result.status);
  console.log(result.data.results[0].name.first);
});

module.exports = {
  handlePromise,
  showUser
};
