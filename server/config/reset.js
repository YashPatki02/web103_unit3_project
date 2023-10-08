import { pool } from "../config/database.js";
import "./dotenv.js";
import { eventsData } from "../data/events.js";
import { locationsData } from "../data/locations.js";

const recreateTables = async () => {
  const dropEventsQuery = `DROP TABLE IF EXISTS events`;
  const dropLocationsQuery = `DROP TABLE IF EXISTS locations`;

  try {
    await pool.query(dropEventsQuery);
    console.log("✅ events table dropped successfully");
  } catch (error) {
    console.error("⚠️ error dropping events table", error);
  }

  try {
    await pool.query(dropLocationsQuery);
    console.log("✅ locations table dropped successfully");
  } catch (error) {
    console.error("⚠️ error dropping locations table", error);
  }
};

const createLocationsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      address VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      zip VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      venue_capacity INT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 locations table created successfully");
  } catch (error) {
    console.error("⚠️ error creating locations table", error);
  }
};

const createEventsTable = async () => {
  const createTableQuery = `    
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      time VARCHAR(100) NOT NULL,
      description VARCHAR(255) NOT NULL,
      location_id INT NOT NULL,
      image TEXT NOT NULL,
      FOREIGN KEY (location_id) REFERENCES locations (id)
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (error) {
    console.error("⚠️ error creating events table", error);
  }
};

const seedLocationsTable = async () => {
  await createLocationsTable();

  for (const location of locationsData) {
    const seedTableQuery = `
      INSERT INTO locations (name, address, city, state, zip, image, venue_capacity) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const values = [
      location.name,
      location.address,
      location.city,
      location.state,
      location.zip,
      location.image,
      location.venue_capacity,
    ];

    try {
      await pool.query(seedTableQuery, values);
      console.log(`✅ ${location.name} added successfully`);
    } catch (error) {
      console.error("⚠️ error inserting location", error);
    }
  }
};

const seedEventsTable = async () => {
  await recreateTables();
  await seedLocationsTable();
  await createEventsTable();

  for (const event of eventsData) {
    const seedTableQuery = `
      INSERT INTO events (date, time, description, location_id, image) 
      VALUES ($1, $2, $3, $4, $5)`;

    const values = [
      event.date,
      event.time,
      event.description,
      event.location_id,
      event.image,
    ];

    try {
      await pool.query(seedTableQuery, values);
      console.log(`✅ ${event.description} added successfully`);
    } catch (error) {
      console.error("⚠️ error inserting event", error);
    }
  }
};

seedEventsTable();
