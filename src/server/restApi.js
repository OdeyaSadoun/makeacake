const BASE_URL = "http://localhost:3001";

export class RestAPI {
  static async fetchData(url, options) {
    var response;
    if (options) {
      response = await fetch(url, options);
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

  static async getUserById(userid) {
    const url = `${BASE_URL}/api/users/${userid}`;
    return await RestAPI.fetchData(url);
  }

  static async getUserByUsernameAndPassword(username, password) {
    console.log('function getUserByUsernameAndPassword',username, password);
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

  static async createUser(first_last_name, username, system_password, email, phone, city, street, house_number, date_of_birth, id_card, is_admin) { 
    const url = `${BASE_URL}/api/users`;
    const body = {first_last_name, username, system_password, email, phone, city, street, house_number, date_of_birth, id_card, is_admin };
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
    const url = `${BASE_URL}/api/users/${userid}/update_email`;
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
    const url = `${BASE_URL}/api/users/${userid}/update_phone`;
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

  static async updateNameByUserId(userid, first_last_name) {
    const url = `${BASE_URL}/api/users/${userid}/update_name`;
    const body = { first_last_name };
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
    const url = `${BASE_URL}/api/users/${userid}/update_password`;
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

  static async updateIsAdminByUserId(userid, isAdmin) {
    const url = `${BASE_URL}/api/users/${userid}/update_is_admin`;
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

  /*********************************************************/

  static async getAllOrders() {
    const url = `${BASE_URL}/api/orders`;
    return await RestAPI.fetchData(url);
  }

  static async getOrderById(orderId) {
    const url = `${BASE_URL}/api/orders/${orderId}`;
    return await RestAPI.fetchData(url);
  }

  static async getOrdersByUserId(userId) {
    const url = `${BASE_URL}/api/users/${userId}/orders`;
    return await RestAPI.fetchData(url);
  }

  static async createOrder(order) {
    const url = `${BASE_URL}/api/orders`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateOrderPaymentType(orderId, paymentType) {
    const url = `${BASE_URL}/api/orders/${orderId}/update_payment_type`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payment_type: paymentType }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateOrderIsPaid(orderId, isPaid) {
    const url = `${BASE_URL}/api/orders/${orderId}/update_is_paid`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_paid: isPaid }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateOrderIsShipping(orderId, isShipping) {
    const url = `${BASE_URL}/api/orders/${orderId}/update_is_shipping`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_shipping: isShipping }),
    };
    return await RestAPI.fetchData(url, options);
  }
  /*********************************************************/
  static async getAllProducts() {
    const url = `${BASE_URL}/api/users/:userid/products`;
    return await RestAPI.fetchData(url);
  }

  static async getProductById(productId) {
    const url = `${BASE_URL}/api/users/:userid/products`;
    return await RestAPI.fetchData(url);
  }

  static async getProductsByUserId(userId) {
    const url = `${BASE_URL}/api/users/:userid/products`;
    return await RestAPI.fetchData(url);
  }

  static async createProduct(product) {
    const url = `${BASE_URL}/api/users/:userid/products`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductPrice(productId, price) {
    const url = `${BASE_URL}/api/products/:productid/update_price`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductQuantity(productId, quantity) {
    const url = `${BASE_URL}/api/products/:productid/update_quantity`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductSensitivity(productId, sensitivity) {
    const url = `${BASE_URL}/api/products/:productid/update_sensitivity`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sensitivity }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductKosherType(productId, kosherType) {
    const url = `${BASE_URL}/api/products/:productid/update_kosher`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kosher_type: kosherType }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductIsDairy(productId, isDairy) {
    const url = `${BASE_URL}/api/products/:productid/update_is_dairy`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_dairy: isDairy }),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteProduct(productId) {
    const url = `${BASE_URL}/api/users/:userid/products`;
    const options = {
      method: "DELETE",
    };
    return await RestAPI.fetchData(url, options);
  }
}

export default RestAPI;
