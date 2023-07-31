use makeacake;

INSERT INTO addresses (city, street, house_number)
VALUES
  ('אלעד', 'המאירי', '7'),
  ('אלעד', 'רבי יוסי בן קיסמא', '36'),
  ('אלעד', 'רבי יוחנן בן זכאי ', '79'),
  ('אלעד', 'אבטליון', '11'),
  ('אלעד', 'רבי יונתן בן עוזיאל', '34');


INSERT INTO users (first_last_name, username, email, phone, address_id, date_of_birth, id_card, is_admin)
VALUES 
  ('אפרת ביטון', 'efratb', 'efrat0548433327@gmail.com', '0556681079', 1, '2001-08-26', NULL, true),
  ('אודיה סעדון', 'odeyasa', 'odeya.sadoun@gmail.com', '0542943408', 2, '2001-10-21', NULL, false);

INSERT INTO passwords (username, system_password)
VALUES
  ('efratb', 'efratb123'),
  ('odeyasa', 'odeyasa123');

INSERT INTO events_management (event_date_time, is_dairy, event_type, event_address_id, discount_percentage, comments, is_arrive)
VALUES
  ('2023-07-15 18:00:00', true, 'bar_mitzva', 3, 10.0, 'Exciting celebration', true),
  ('2023-08-02 20:30:00', false, 'company_event', 4, 5, 'Business party', false),
  ('2023-09-10 12:00:00', true, 'shabat_event', 5, 0, 'Traditional lunch', true),
  ('2023-10-05 19:45:00', false, 'engagement', 3, 0, 'Announcing the engagement', false),
  ('2023-11-20 15:30:00', true, 'bat_mitzva', 5, 0, 'Celebrating a special day', true);
