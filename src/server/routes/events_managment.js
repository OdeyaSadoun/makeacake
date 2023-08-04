const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

/*Parse request bodies as JSON*/
router.use(bodyParser.json());

/*Get all events*/
router.get("/", (req, res) => {
  connection.query("SELECT * FROM events_management", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve events" });
      return;
    }

    res.json(results);
  });
});

/*Get event by ID*/
router.get("/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  connection.query(
    "SELECT * FROM events_management WHERE id = ?",
    [eventId],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve event" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});

/*POST add new event*/
router.post("/add_event", (req, res) => {
  const {
    event_date_time,
    is_dairy,
    event_type,
    event_address_id,
    discount_percentage,
    comments,
    is_arrive,
  } = req.body;

  // Check if the event address exists
  connection.query(
    "SELECT * FROM addresses WHERE id = ?",
    [event_address_id],
    (err, addressResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to add event" });
        return;
      }

      if (addressResults.length === 0) {
        // Event address not found
        res.status(400).json({ error: "Event address not found" });
        return;
      }

      // Insert new event into the 'events_management' table
      connection.query(
        "INSERT INTO events_management (event_date_time, is_dairy, event_type, event_address_id, discount_percentage, comments, is_arrive) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          event_date_time,
          is_dairy,
          event_type,
          event_address_id,
          discount_percentage,
          comments,
          is_arrive,
        ],
        (err, insertResults) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Failed to add event" });
            return;
          }

          const newEventId = insertResults.insertId;
          res
            .status(201)
            .json({ message: "Event added successfully", eventId: newEventId });
        }
      );
    }
  );
});

/*PUT update event*/
router.put("/api/events/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const {
    event_date_time,
    is_dairy,
    event_type,
    event_address_id,
    discount_percentage,
    comments,
    is_arrive,
  } = req.body;
  connection.query(
    "UPDATE events_management SET event_date_time = ?, is_dairy = ?, event_type = ?, event_address_id = ?, discount_percentage = ?, comments = ?, is_arrive = ? WHERE id = ?",
    [
      event_date_time,
      is_dairy,
      event_type,
      event_address_id,
      discount_percentage,
      comments,
      is_arrive,
      eventId,
    ],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated successfully" });
    }
  );
});

/*  event date and time*/
router.put("/update_date_time/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { event_date_time } = req.body;
  connection.query(
    "UPDATE events_management SET event_date_time = ? WHERE id = ?",
    [event_date_time, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update date and time event" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated date and time successfully" });
    }
  );
});

/*PUT update dairy status*/
router.put("/update_is_dairy/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { is_dairy } = req.body;
  connection.query(
    "UPDATE events_management SET is_dairy = ? WHERE id = ?",
    [is_dairy, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update is dairy to event" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated is dairy successfully" });
    }
  );
});

/*PUT update event type*/
router.put("/update_type/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { event_type } = req.body;
  connection.query(
    "UPDATE events_management SET event_type = ? WHERE id = ?",
    [event_type, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event's type" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated type successfully" });
    }
  );
});

/*PUT update event address*/
//********need to fix this function!!!!********/
router.put("/update_address/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { event_address_id } = req.body;
  connection.query(
    "UPDATE events_management SET event_address_id = ? WHERE id = ?",
    [event_address_id, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event's address" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated address successfully" });
    }
  );
});

/*PUT update discount percentage*/
router.put("/update_discount/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { discount_percentage } = req.body;
  connection.query(
    "UPDATE events_management SET discount_percentage = ? WHERE id = ?",
    [discount_percentage, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event's discount" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated discount successfully" });
    }
  );
});

/*PUT update event comments*/
router.put("/update_comments/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { comments } = req.body;
  connection.query(
    "UPDATE events_management SET comments = ? WHERE id = ?",
    [comments, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event's comments" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated comments successfully" });
    }
  );
});

/*PUT update arrival status*/
router.put("/update_is_arrival/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  const { is_arrive } = req.body;
  connection.query(
    "UPDATE events_management SET is_arrive = ? WHERE id = ?",
    [is_arrive, eventId],
    (err, updateResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update event's is_arrival" });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event updated is_arrival successfully" });
    }
  );
});

/*Delete event*/
router.delete("/api/events/:eventid", (req, res) => {
  const eventId = req.params.eventid;
  connection.query(
    "DELETE FROM events_management WHERE id = ?",
    [eventId],
    (err, deleteResults) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to delete event" });
        return;
      }

      if (deleteResults.affectedRows === 0) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      res.json({ message: "Event deleted successfully" });
    }
  );
});

module.exports = router;
