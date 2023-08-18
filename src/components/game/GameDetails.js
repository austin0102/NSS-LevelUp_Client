import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../../managers/GameManager.js";

export const GameDetails = () => {
    const { id } = useParams(); // Get the game ID from the URL parameters
    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        // Fetch game details based on the ID from the URL
        getGameById(id)
            .then(data => setGameDetails(data))
            .catch(error => console.error("Error fetching game details:", error));
    }, [id]);

    if (!gameDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-details">
            <h2>{gameDetails.game_title}</h2>
            <p>Creator: {gameDetails.creator}</p>
            <p>Number of Players: {gameDetails.number_of_players}</p>
            <p>Skill Level: {gameDetails.skill_level}</p>
            {/* Add other game details here */}
        </div>
    );
};


