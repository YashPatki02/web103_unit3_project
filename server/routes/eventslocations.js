import express from "express";
// import controllers for events and locations
import EventController from '../controllers/events.js'
import LocationController from "../controllers/locations.js";

const router = express.Router();

router.get("/events", EventController.getEvents);
router.get("/events/:eventId", EventController.getEventById)
router.get("/locations", LocationController.getLocations);

router.get("/:locationId", EventController.getEventsByLocation);
router.get("/locations/:locationId", LocationController.getLocationById);

export default router;
