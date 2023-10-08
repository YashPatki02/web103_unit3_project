import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM locations ORDER BY id ASC`);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const selectQuery = `SELECT name, address, city, state, zip, image, venue_capacity 
          FROM locations 
          WHERE id = $1
          `;

    const results = await pool.query(selectQuery, [locationId]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export default { getLocations, getLocationById };
