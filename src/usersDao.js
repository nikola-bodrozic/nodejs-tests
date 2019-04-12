const axios = require("axios");

class Users {
  getUserLocation() {
    return { lat: "-37.3159", lng: "81.1496" };
  }
  async getUserLocation2() {
    let d;
    const data = await axios.get("https://api.randomuser.me/?nat=us,gb&results=5")
    return data
  }
}

module.exports = Users;