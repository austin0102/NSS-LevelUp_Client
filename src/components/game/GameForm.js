

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createGame, getGameTypes } from '../../managers/GameManager.js';

export const GameForm = () => {
    const navigate = useNavigate();
    const [gameTypes, setGameTypes] = useState([]);

    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: 0,
        title: "",
        creator: "",
        gameTypeId: 0
    });

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data));
    }, []);
    

    //handle changes in the form inputs. It receives the DOM event from the input elements
    const changeGameState = (domEvent) => {
        //Create shallow copy og the currentGame State
        const newGameState = { ...currentGame };
        //This line updates the property in newGameState that corresponds to the name of 
        //the input element that triggered the change event (domEvent.target.name). 
        //It sets the value to the new value of the input (domEvent.target.value)
        newGameState[domEvent.target.name] = domEvent.target.value;
        //updates the state 
        setCurrentGame(newGameState);
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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
                    createGame(game)
                        .then(() => navigate("/games"));
                }}
                className="btn btn-primary">Create</button>
        </form>
    );
            }
