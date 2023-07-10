const BASE_URL = "http://localhost:3000";

export class RestAPI {
  static async fetchData(url, options) {
    var response;
    if (options) {
      response = await fetch(url, options);
      console.log("hi fetchData register options");
    } else {
      response = await fetch(url);
    }
    const jsonData = await response.json(); // Parse response body as JSON
    return jsonData; // Return the parsed JSON data
  }

  static async getAllUsers() {
    const url = `${BASE_URL}/api/users`;
    return await RestAPI.fetchData(url);
  }

  static async getUserByUsernameAndPassword(username, password) {
    const url = `${BASE_URL}/api/users/login`;
    const body = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("options", options);
    return await RestAPI.fetchData(url, options);
  }

  static async createUser(name, username, email, phone, website, password) {
    const url = `${BASE_URL}/api/users`;
    const body = { name, username, email, phone, website, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("api-create");
    console.log("options", options);
    return await RestAPI.fetchData(url, options);
  }

  static async updateEmailByUserId(userid, email) {
    const url = `${BASE_URL}/api/users/${username}/email`;
    const body = { email };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePhoneByUserId(userid, phone) {
    const url = `${BASE_URL}/api/users/${username}/phone`;
    const body = { phone };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateNameByUserId(userid, name) {
    const url = `${BASE_URL}/api/users/${username}/name`;
    const body = { name };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePasswordByUserId(userid, password) {
    const url = `${BASE_URL}/api/users/${username}/password`;
    const body = { password };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async getUserById(id) {
    const url = `${BASE_URL}/api/users/${id}`;
    return await RestAPI.fetchData(url);
  }
  
  static async updateIsAdmin(username, isAdmin) {
    const url = `${BASE_URL}/api/users/${username}/isAdmin`;
    const body = { isAdmin };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }
  

}

export default RestAPI;