import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { updateGame, getGameTypes, getGameById } from '../../managers/GameManager.js';

export const UpdateGame = () => {
    const navigate = useNavigate();
    const [gameTypes, setGameTypes] = useState([]);
    const { id } = useParams();

    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: 0,
        title: "",
        creator: "",
        gameTypeId: 0
    });

    useEffect(() => {
        // Get the game types and set the state
        getGameTypes().then(data => setGameTypes(data));

        // Get the existing game data and populate the form
        getGameById(id)
            .then(gameData => {
                setCurrentGame({
                    skillLevel: gameData.skill_level,
                    numberOfPlayers: gameData.number_of_players,
                    title: gameData.game_title,
                    creator: gameData.creator,
                    gameTypeId: gameData.game_type.id
                });
            });
    }, [id]);
    

    const changeGameState = (domEvent) => {
        const newGameState = { ...currentGame };
        newGameState[domEvent.target.name] = domEvent.target.value;
        setCurrentGame(newGameState);
    }
    


    return (
        <form className="UpdateGame">
            <h2 className="UpdateGame__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="creator">Creator: </label>
                    <input type="text" name="creator" required className="form-control"
                        value={currentGame.creator}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}
                    >
                        <option value="">Select a Game Type</option>
                        {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <select name="skillLevel" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                
            </fieldset>
    
           
            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault();
    
                    const game = {
                        
                        creator: currentGame.creator,
                        game_title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameTypeId)
                    };
    
                    // Send POST request to your API
                    updateGame(game, id)
                        .then(() => navigate("/games"));
                }}
                className="btn btn-primary">Update</button>
        </form>
    );
}