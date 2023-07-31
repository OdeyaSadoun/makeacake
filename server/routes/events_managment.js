const express = require("express");
const connection = require("../models/connection.js");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const router = express.Router(); // Create a router object to define routes
const app = express(); // Create an instance of the Express application
app.use(express.json()); // Parse incoming requests with JSON payloads

router.use(bodyParser.json()); // Parse request bodies as JSON

// Get all events
router.get("/api/events", (req, res) => {
  connection.query("SELECT * FROM events_management", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve events" });
      return;
    }

    res.json(results);
  });
});

// Get event by ID
router.get("/api/events/:eventid", (req, res) => {
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

// Add new event
router.post("/api/events", (req, res) => {
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

// Update event
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

// Delete event
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
