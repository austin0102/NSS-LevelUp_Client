import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])


    const handleDelete = (eventId) => {
        // Call your deleteEvent function and then update the events list
        deleteEvent(eventId)
            .then(() => {
                // Remove the deleted event from the list
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    };


    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" });
                }}
            >
                Register New Event
            </button>
            <article className="events">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__title">{event.event_title} by {event.organizer.full_name}</div>
                            <div className="event__game">What we will play: {event.game.game_title}</div>
                            <div className="event__date">When: {event.date_time}</div>
                            <div className="event__location">Where: {event.location}</div>
                            <button
                                    className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        navigate(`/events/${event.id}`);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-2 btn-sep icon-create"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    Delete
                                </button>
                        </section>
                    })
                }
            </article>
        </div>
    )
}