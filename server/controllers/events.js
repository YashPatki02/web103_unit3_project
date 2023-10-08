import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM events ORDER BY id ASC`);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getEventsByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const selectQuery = `SELECT * FROM events WHERE location_id = $1`;

    const results = await pool.query(selectQuery, [locationId]);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const selectQuery = `SELECT * FROM events WHERE id = $1`;

    const results = await pool.query(selectQuery, [eventId]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
}

export default { getEvents, getEventsByLocation, getEventById };
