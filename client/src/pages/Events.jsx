import { useEffect, useState } from "react";
import EventsAPI from "../services/EventsAPI";
import Event from "../components/Event";
import "../css/Events.css";

const Events = () => {
    const [allEvents, setAllEvents] = useState([]); 
    const [events, setEvents] = useState([]);
    const [selectLocation, setSelectLocation] = useState("");

    const handleChange = () => {
        setSelectLocation("");
    };

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents();
                setAllEvents(eventsData);
                setEvents(eventsData);
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    useEffect(() => {
        if (selectLocation === "") {
            setEvents(allEvents);
            return;
        }

        (async () => {
            try {
                const eventsData = await EventsAPI.getEventsByLocation(
                    parseInt(selectLocation)
                );
                setEvents(eventsData);
            } catch (error) {
                throw error;
            }
        })();
    }, [selectLocation]);

    return (
        <div className="events">
            <h1>Events</h1>

            <div className="location-select">
                <select
                    id="location"
                    name="location"
                    value={selectLocation}
                    onChange={(e) => setSelectLocation(e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="1">Echo Lounge</option>
                    <option value="2">House of Blues</option>
                    <option value="3">Pavilion</option>
                    <option value="4">American Airlines Arena</option>
                </select>

                <button onClick={handleChange}>Show All Events</button>
            </div>

            <main>
                {events && events.length > 0 ? (
                    events.map((event, index) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            description={event.description}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
                        {"No events scheduled at this location yet!"}
                    </h2>
                )}
            </main>
        </div>
    );
};

export default Events;
