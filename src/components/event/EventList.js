import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.event_title} by {event.organizer.full_name}</div>
                        <div className="event__game">What we will play: {event.game.game_title}</div>
                        <div className="event__date">When: {event.date_time}</div>
                        <div className="event__location">Where: {event.location}</div>
                    </section>
                })
            }
        </article>
    )
}