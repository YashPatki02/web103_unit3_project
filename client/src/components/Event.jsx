import React, { useState, useEffect } from "react";
import "../css/Event.css";
import EventsAPI from "../services/EventsAPI";
import dates from "../services/dates";

const Event = (props) => {
    const [event, setEvent] = useState({});
    const [time, setTime] = useState("");
    const [remaining, setRemaining] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id);
                const eventDate = await dates.formatDate(eventData.date);
                const eventImage = await EventsAPI.getEventImage(
                    props.image
                );
                setEvent({...eventData, date: eventDate, image: eventImage});
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const result = await dates.formatTime(event.time);
                setTime(result);
            } catch (error) {
                throw error;
            }
        })();
    }, [event]);

    useEffect(() => {
        (async () => {
            try {
                const timeRemaining = await dates.formatRemainingTime(
                    event.date
                );
                setRemaining(timeRemaining);
            } catch (error) {
                throw error;
            }
        })();
    }, [event]);

    return (
        <article className="event-information">
            <img src={EventsAPI.images[event.image]} />

            <div className="event-information-overlay">
                <div className="text">
                    <h3>{event.description}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i>{" "}
                        {event.date} <br /> {time}
                    </p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
};

export default Event;
