"use strict";
const fetch = require('node-fetch');
const axios = require('axios')

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

const cvFetch = async  (num=5) => {
  const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
  const giphyAPI = "https://api.giphy.com/v1/gifs/search?rating=G&api_key=dc6zaTOxFJmzC&q=";

  const response1 = await fetch(`${wordnikAPI}&minLength=${num}&maxLength=${num}`);
  const json1 = await response1.json();
  
  const response2 = await fetch(giphyAPI + json1.word);
  const json2 = await response2.json();
  
  let img_url = null;
  try {
    img_url = json2.data[0].images['fixed_height_small'].url;
  } catch (err) {
    console.log('no image found for ' + json1.word);
    console.error(err);
  }
  return {
    word: json1.word,
    img: img_url
  }
}

const cvAxios = async (num=5) => {
  const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
  const giphyAPI = "https://api.giphy.com/v1/gifs/search?rating=G&api_key=dc6zaTOxFJmzC&q=";
    try {
      const response1 = await axios.get(`${wordnikAPI}&minLength=${num}&maxLength=${num}`);
      let w = response1.data.word;
      const response2 = await axios.get(giphyAPI + w);
      let url = response2.data.data[0].url;
      return [w, url]
    } catch (error) {
      console.error(error);
    }
}

module.exports = {
  handlePromise,
  showUser,
  cvFetch,
  cvAxios
};
