import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getGames } from '../../managers/GameManager.js';
import { updateEvent, getEventById } from "../../managers/EventManager.js";
import { useParams } from "react-router-dom";

export const UpdateEvent = () => {
    const navigate = useNavigate();
    const localCurrentUser = localStorage.getItem("auth_token");
    const currentUserObject = JSON.parse(localCurrentUser);
    const {id} = useParams()

    const [games, setGames] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({
        eventTitle: "",
        dateTime: "",
        organizerId: currentUserObject,
        gameId: 0,
        location: ""
    });

    useEffect(() => {
        // Get the event types and set the state
        getGames().then(data => setGames(data));

        // Get the existing Event data and populate the form
        getEventById(id)
            .then(eventData => {
                setCurrentEvent({
                    eventTitle: eventData.event_title,
                    dateTime: eventData.date_time,
                    organizerId: eventData.organizerId,
                    gameId: eventData.gameId,
                    location: eventData.location
                });
            });
    }, [id]);

    useEffect(() => {
        // Get the list of games for the dropdown
        getGames().then(data => setGames(data));
    }, []);

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState[domEvent.target.name] = domEvent.target.value;
        setCurrentEvent(newEventState);
    }

    return (
        <form className="UpdateEvent">
            <h2 className="UpdateEvent__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTitle">Event Title: </label>
                    <input type="text" name="eventTitle" required autoFocus className="form-control"
                        value={currentEvent.eventTitle}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateTime">Date and Time: </label>
                    <input type="datetime-local" name="dateTime" required className="form-control"
                        value={currentEvent.dateTime}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" required className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}
                    >
                        <option value="">Select a Game</option>
                        {games.map(game => (
                            <option key={game.id} value={game.id}>
                                {game.game_title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
    
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault();

                    const event = {
                        
                        event_title: currentEvent.eventTitle,
                        date_time: currentEvent.dateTime,
                        organizer: currentEvent.organizerId,
                        game: parseInt(currentEvent.gameId),
                        location: currentEvent.location
                    };

                    // Send POST request to your API
                    updateEvent(event, id)
                        .then(() => navigate("/events"));
                }}
                className="btn btn-primary">Update Event</button>
        </form>
    );
}

