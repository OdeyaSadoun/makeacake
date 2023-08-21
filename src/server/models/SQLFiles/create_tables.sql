use makeacake;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255),
  is_dairy BOOLEAN,
  price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2),
  kosher_type ENUM('bet_yosef', 'haeda_hacharedit', 'chatam_sofer_bnei_brak'), 
  comments VARCHAR(255), 
  sensitivity VARCHAR(255)
);

CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(255),
  street VARCHAR(255),
  house_number VARCHAR(10)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_last_name VARCHAR(255),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address_id INT,
  date_of_birth DATE,
  id_card VARCHAR(255) UNIQUE,
  is_admin BOOLEAN,
  FOREIGN KEY (address_id) REFERENCES addresses(id)
);

CREATE TABLE passwords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  system_password VARCHAR(255)
);

CREATE TABLE events_management (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_date_time DATETIME,
  is_dairy BOOLEAN,
  event_type ENUM('bat_mitzva', 'bar_mitzva', 'brit', 'engagement', 'company_event', 'birthday', 'shabat_event'),
  event_address_id INT,
  discount_percentage DECIMAL(5, 2),
  comments VARCHAR(255),
  is_arrive BOOLEAN,
  FOREIGN KEY (event_address_id) REFERENCES addresses(id)
);

CREATE TABLE media_product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  media LONGBLOB, -- or BLOB, depending on your needs
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE media_event (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  media BLOB,
  FOREIGN KEY (event_id) REFERENCES events_management(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  payment_type ENUM('credit', 'cash'),
  is_paid BOOLEAN,
  is_shipping BOOLEAN,
  order_address_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_address_id) REFERENCES addresses(id)
);

CREATE TABLE order_product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE order_event (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  event_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (event_id) REFERENCES events_management(id)
);

CREATE TABLE like_product_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  is_like BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE shopping_cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);