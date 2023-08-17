import React, { useEffect, useState } from "react";
import { getGameById } from "../../managers/GameManager.js";
import { useNavigate } from "react-router-dom";

export const GameDetails = (props) => {
    const [game, setGame] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getGameById(props.id) // Use props.id here
            .then(data => setGame(data))
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, [props.id]); // Add props.id to the dependency array

    return (
        <div>
            <article className="games">
                {
                    game.map(gameItem => {
                        return (
                            <section key={`game--${gameItem.id}`} className="game">
                                <div className="game__title">{gameItem.game_title} by {gameItem.creator}</div>
                                <div className="game__players">{gameItem.number_of_players} players needed</div>
                                <div className="game__skillLevel">Skill level is {gameItem.skill_level}</div>
                            </section>
                        );
                    })
                }
            </article>
        </div>
    );
};
