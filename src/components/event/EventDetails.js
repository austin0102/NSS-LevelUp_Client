import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../managers/EventManager";

export const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL parameters
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        // Fetch event details based on the ID from the URL
        getEventById(id)
            .then(data => setEventDetails(data))
            .catch(error => console.error("Error fetching event details:", error));
    }, [id]);

    if (!eventDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event-details">
            <h2>{eventDetails.event_title}</h2>
            <p>When: {eventDetails.date_time}</p>
            <p>Location: {eventDetails.location}</p>
        </div>
    );
};
