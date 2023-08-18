import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {
    //Initialize a state variable games to hold the list of games.
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    
    //Use the useEffect hook with an empty dependency array to 
    //fetch the list of games when the component mounts.
    useEffect(() => {
        //fetch list of games and update game state
        getGames().then(data => setGames(data))
    }, [])
    

    const handleDelete = (gameId) => {
        // Call your deleteGame function and then update the games list
        deleteGame(gameId)
            .then(() => {
                // Remove the deleted game from the list
                setGames(prevGames => prevGames.filter(game => game.id !== gameId));
            })
            .catch(error => {
                console.error("Error deleting game:", error);
            });
    };

    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" });
                }}
            >
                Register New Game
            </button>
            <article className="games">
                {
                    games.map(game => {
                        return (
                            <section key={`game--${game.id}`} className="game">
                                <div className="game__title">{game.game_title} by {game.creator}</div>
                                <div className="game__players">{game.number_of_players} players needed</div>
                                <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                                <button
                                    className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        navigate(`/games/${game.id}`);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-2 btn-sep icon-create"
                                    onClick={() => handleDelete(game.id)}
                                >
                                    Delete
                                </button>
                            </section>
                        );
                    })
                }
            </article>
        </div>
    );
}