import adele from "../assets/images/adele.jpg";
import ariana from "../assets/images/ariana.jpg";
import alicia from "../assets/images/alicia.jpg";
import beyonce from "../assets/images/beyonce.jpg";
import bruno from "../assets/images/bruno.jpg";
import coldplay from "../assets/images/coldplay.jpg";
import drake from "../assets/images/drake.jpg";
import ed from "../assets/images/ed.jpg";
import elton from "../assets/images/elton.jpg";
import justin from "../assets/images/justin.jpg";
import katy from "../assets/images/katy.jpg";
import kendrick from "../assets/images/kendrick.jpg";
import ladygaga from "../assets/images/ladygaga.jpg";
import madonna from "../assets/images/madonna.jpg";
import maroon from "../assets/images/maroon.jpg";
import rihanna from "../assets/images/rihanna.jpg";
import taylor from "../assets/images/taylor.jpg";
import shawn from "../assets/images/shawn.jpg";
import weeknd from "../assets/images/weeknd.jpg";
import u2 from "../assets/images/u2.jpg";

const images = {
    'adele': adele,
    'ariana': ariana,   
    'alicia': alicia,
    'beyonce': beyonce,
    'bruno': bruno,
    'coldplay': coldplay,
    'drake': drake,
    'ed': ed,
    'elton': elton,
    'justin': justin,
    'katy': katy,
    'kendrick': kendrick,
    'ladygaga': ladygaga,
    'madonna': madonna,
    'maroon': maroon,
    'rihanna': rihanna,
    'taylor': taylor,
    'shawn': shawn,
    'weeknd': weeknd,
    'u2': u2,
};

const getAllEvents = async () => {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();

    return data;
};

const getEventById = async (eventId) => {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
    const data = await response.json();

    return data;
};

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`http://localhost:3000/api/${locationId}`);
    const data = await response.json();

    return data;
};

const getEventImage = async (imageId) => {
    const name = imageId.split("/")[3].split(".")[0];

    return name;
};

export default {
    getAllEvents,
    getEventsByLocation,
    getEventById,
    getEventImage,
    images,
};
