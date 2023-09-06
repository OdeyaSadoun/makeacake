const BASE_URL = "http://localhost:3001";
const USERS_BASE_URL = `${BASE_URL}/users`;
const ORDERS_BASE_URL = `${BASE_URL}/orders`;
const PRODUCTS_BASE_URL = `${BASE_URL}/products`;
const ADDRESS_BASE_URL = `${BASE_URL}/addresses`;
const EVENTS_BASE_URL = `${BASE_URL}/events-managment`;
////
export class RestAPI {
  static async fetchData(url, options) {

    // console.log(options)
    //general function to fetch
    var response;
    // console.log(options=== undefined);
    if (options === undefined) {
      // console.log("!option");
      response = await fetch(url);
    } else {
      // console.log("option ok");
      response = await fetch(url, options);
    }
    const jsonData = await response.json(); // Parse response body as JSON
    return jsonData; // Return the parsed JSON data
  }

  /*Users*/
  /**********************************************************/
  static async getAllUsers() {
    const url = USERS_BASE_URL;
    return await RestAPI.fetchData(url);
  }

  static async getUserById(userid) {
    const url = `${USERS_BASE_URL}/${userid}`;
    return await RestAPI.fetchData(url);
  }

  static async getUserByUsernameAndPassword(username, password) {
    const url = `${USERS_BASE_URL}/login`;
    const mybody = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mybody),
    };
    console.log("options", options);
    return await RestAPI.fetchData(url, options);
  }

  static async createUser(
    first_last_name,
    username,
    system_password,
    email,
    phone,
    city,
    street,
    house_number,
    date_of_birth,
    id_card,
    is_admin
  ) {
    const url = `${USERS_BASE_URL}/register`;
    const body = {
      first_last_name,
      username,
      email,
      phone,
      city,
      street,
      house_number,
      date_of_birth,
      id_card,
      system_password,
      is_admin,
    };
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
    const url = `${USERS_BASE_URL}/update_email/${userid}`;
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
    const url = `${USERS_BASE_URL}/update_phone/${userid}`;
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
    const url = `${USERS_BASE_URL}/update_name/${userid}`;
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
    const url = `${USERS_BASE_URL}/update_password/${userid}`;
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

  static async updateIsAdminByUserId(userid, is_admin) {
    const url = `${USERS_BASE_URL}/update_is_admin/${userid}`;
    const body = { userid, is_admin };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  /* Orders */
  /**********************************************************/
  static async getAllOrders() {
    const url = `${ORDERS_BASE_URL}`;
    return await RestAPI.fetchData(url);
  }

  static async getOrderById(orderid) {
    const url = `${ORDERS_BASE_URL}/${orderid}`;
    return await RestAPI.fetchData(url);
  }

  static async getOrdersByUserId(userid) {
    const url = `${ORDERS_BASE_URL}/user/${userid}`;
    return await RestAPI.fetchData(url);
  }

  static async addOrder(
    id,
    user_id,
    payment_type,
    is_paid,
    is_shipping,
    order_address_id
  ) {
    const url = `${ORDERS_BASE_URL}/add_order`;
    const body = {
      id,
      user_id,
      payment_type,
      is_paid,
      is_shipping,
      order_address_id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updatePaymentType(orderid, payment_type) {
    const url = `${ORDERS_BASE_URL}/update_payment_type/${orderid}`;
    const body = { payment_type };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateIsPaid(orderid, is_paid) {
    const url = `${ORDERS_BASE_URL}/update_is_paid/${orderid}`;
    const body = { is_paid };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateIsShipping(orderid, is_shipping) {
    const url = `${ORDERS_BASE_URL}/update_is_shipping/${orderid}`;
    const body = { is_shipping };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  /* Event Management */
  /**********************************************************/
  static async getAllEvents() {
    const url = `${EVENTS_BASE_URL}`;
    return await RestAPI.fetchData(url);
  }

  static async getEventById(eventid) {
    const url = `${EVENTS_BASE_URL}/${eventid}`;
    return await RestAPI.fetchData(url);
  }

  static async addEvent(
    event_date_time,
    is_dairy,
    event_type,
    event_address_id,
    discount_percentage,
    comments,
    is_arrive
  ) {
    const url = `${EVENTS_BASE_URL}/add_event`;
    const body = {
      event_date_time,
      is_dairy,
      event_type,
      event_address_id,
      discount_percentage,
      comments,
      is_arrive,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEvent(eventid, event_data) {
    const url = `${EVENTS_BASE_URL}/${eventid}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event_data),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventDateTime(eventid, event_date_time) {
    const url = `${EVENTS_BASE_URL}/update_date_time/${eventid}`;
    const body = { event_date_time };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventDairyStatus(eventid, is_dairy) {
    const url = `${EVENTS_BASE_URL}/update_is_dairy/${eventid}`;
    const body = { is_dairy };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventType(eventid, event_type) {
    const url = `${EVENTS_BASE_URL}/update_type/${eventid}`;
    const body = { event_type };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventAddress(eventid, event_address_id) {
    const url = `${EVENTS_BASE_URL}/update_address/${eventid}`;
    const body = { event_address_id };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventDiscount(eventid, discount_percentage) {
    const url = `${EVENTS_BASE_URL}/update_discount/${eventid}`;
    const body = { discount_percentage };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventComments(eventid, comments) {
    const url = `${EVENTS_BASE_URL}/update_comments/${eventid}`;
    const body = { comments };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateEventArrivalStatus(eventid, is_arrive) {
    const url = `${EVENTS_BASE_URL}/update_is_arrival/${eventid}`;
    const body = { is_arrive };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteEvent(eventid) {
    const url = `${EVENTS_BASE_URL}/${eventid}`;
    const options = {
      method: "DELETE",
    };
    return await RestAPI.fetchData(url, options);
  }

  /* Address Management */
  /**********************************************************/
  static async getAllAddresses() {
    const url = `${ADDRESS_BASE_URL}`;
    return await RestAPI.fetchData(url);
  }

  static async getAddressById(addressid) {
    const url = `${ADDRESS_BASE_URL}/${addressid}`;
    return await RestAPI.fetchData(url);
  }

  static async addAddress(street, city, state, postal_code, country) {
    const url = `${ADDRESS_BASE_URL}/add_address`;
    const body = { street, city, state, postal_code, country };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddress(addressid, address_data) {
    const url = `${ADDRESS_BASE_URL}/${addressid}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address_data),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddressStreet(addressid, street) {
    const url = `${ADDRESS_BASE_URL}/update_street/${addressid}`;
    const body = { street };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddressCity(addressid, city) {
    const url = `${ADDRESS_BASE_URL}/update_city/${addressid}`;
    const body = { city };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddressState(addressid, state) {
    const url = `${ADDRESS_BASE_URL}/update_state/${addressid}`;
    const body = { state };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddressPostalCode(addressid, postal_code) {
    const url = `${ADDRESS_BASE_URL}/update_postal_code/${addressid}`;
    const body = { postal_code };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateAddressCountry(addressid, country) {
    const url = `${ADDRESS_BASE_URL}/update_country/${addressid}`;
    const body = { country };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteAddress(addressid) {
    const url = `${ADDRESS_BASE_URL}/${addressid}`;
    const options = {
      method: "DELETE",
    };
    return await RestAPI.fetchData(url, options);
  }

  /* Products */
  /**********************************************************/
  static async getAllProducts() {
    console.log("getAllProducts");
    const url = `${PRODUCTS_BASE_URL}`;
    return await RestAPI.fetchData(url);
  }

  static async getProductById(productid) {
    const url = `${PRODUCTS_BASE_URL}/${productid}`;
    return await RestAPI.fetchData(url);
  }
  static async getProductImages(productid) {
    const url = `${PRODUCTS_BASE_URL}/get_image/${productid}`;
    return await RestAPI.fetchData(url);
  }

  
  static async getAllUserProducts(userid) {
    const url = `${PRODUCTS_BASE_URL}/user/${userid}`;
    return await RestAPI.fetchData(url);
  }

  static async getAllLikeUserProducts(userid) {
    const url = `${PRODUCTS_BASE_URL}/user/like/${userid}`;
    return await RestAPI.fetchData(url);
  }

  static async addProduct(product_name, is_dairy, price, discount_percentage,kosher_type, comments, sensitivity, image) {
    const url = `${PRODUCTS_BASE_URL}/add_product`;
    const body = { product_name, is_dairy, price, discount_percentage,kosher_type, comments, sensitivity, image};
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }


  static async addProductUser(user_id, product_id, quantity) {
    console.log(user_id, product_id, quantity, "user_id, product_id, quantity");
    const url = `${PRODUCTS_BASE_URL}/add_product_user`;
    const body = { user_id, product_id, quantity };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async addLikeProductUser(user_id, product_id, is_like) {
    console.log(user_id, product_id, is_like, "user_id, product_id, is_like");
    const url = `${PRODUCTS_BASE_URL}/add_like_product_user`;
    const body = { user_id, product_id, is_like };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductPrice(productid, price) {
    const url = `${PRODUCTS_BASE_URL}/update_price/${productid}`;
    const body = { price };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductDiscount(productid, discount_percentage) {
    const url = `${PRODUCTS_BASE_URL}/update_discount/${productid}`;
    const body = { discount_percentage };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductQuantity(userid, productid, quantity) {
    const url = `${PRODUCTS_BASE_URL}/update_quantity/${productid}`;
    const body = { quantity, userid };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductSensitivity(productid, sensitivity) {
    const url = `${PRODUCTS_BASE_URL}/update_sensitivity/${productid}`;
    const body = { sensitivity };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductKosher(productid, kosher) {
    const url = `${PRODUCTS_BASE_URL}/update_kosher/${productid}`;
    const body = { kosher };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductIsDairy(productid, is_dairy) {
    const url = `${PRODUCTS_BASE_URL}/update_is_dairy/${productid}`;
    const body = { is_dairy };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async updateProductUserIsLike(userid, productid, is_like) {
    const url = `${PRODUCTS_BASE_URL}/update_is_like/${productid}`;
    const body = { userid, is_like };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteProduct(productid) {
    const url = `${PRODUCTS_BASE_URL}/delete_products/${productid}`;
    const options = {
      method: "DELETE",
    };
    return await RestAPI.fetchData(url, options);
  }

  static async deleteUserProduct(productid) {
    const url = `${PRODUCTS_BASE_URL}/delete_user_product/${productid}`;
    const options = {
      method: "DELETE",
    };
    return await RestAPI.fetchData(url, options);
  }


  static async deleteLikeProduct(productid, userid) {
    const url = `${PRODUCTS_BASE_URL}/delete_like_product/${productid}`;
    const body = { userid };
    const options = {
      method: "DELETE",
      body: JSON.stringify(body),
    };
    return await RestAPI.fetchData(url, options);
  }
}
export default RestAPI;
