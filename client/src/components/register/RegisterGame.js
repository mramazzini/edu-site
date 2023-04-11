import React, { useState, useEffect } from "react";
import RegisterParticles from "./RegisterParticles";
const RegisterGame = ({ score, setScore }) => {
  const [game, setGame] = useState({
    position: { x: 0, y: 0 },
    apple: { x: 0, y: 0 },
    direction: "right",
    gameOver: true,
    body: [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
  });
  const [keysPressed, setKeysPressed] = useState({});
  const [stonks, setStonks] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevState) => ({
        ...prevState,
        [event.code]: true,
      }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevState) => ({
        ...prevState,
        [event.code]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Use the `keysPressed` state object to control the game logic

  const handleGameLogic = () => {
    setGame((prevState) => {
      return {
        ...prevState,
        body: [
          { x: prevState.position.x, y: prevState.position.y },
          ...prevState.body.slice(0, -1),
        ],
      };
    });
    if (game.gameOver) {
      return;
    }
    //Check if snake is out of bounds

    if (keysPressed["ArrowUp"] && game.direction !== "down") {
      setGame((prevState) => ({ ...prevState, direction: "up" }));
    }
    if (keysPressed["ArrowDown"] && game.direction !== "up") {
      setGame((prevState) => ({ ...prevState, direction: "down" }));
    }
    if (keysPressed["ArrowLeft"] && game.direction !== "right") {
      setGame((prevState) => ({ ...prevState, direction: "left" }));
    }
    if (keysPressed["ArrowRight"] && game.direction !== "left") {
      setGame((prevState) => ({ ...prevState, direction: "right" }));
    }

    switch (game.direction) {
      case "up":
        if (game.position.y < 1) {
          setGame((prevState) => ({ ...prevState, gameOver: true }));
          console.log(game.position.x, game.position.y);
        } else {
          setGame((prevState) => ({
            ...prevState,
            position: { x: prevState.position.x, y: prevState.position.y - 1 },
          }));
        }
        break;
      case "down":
        if (game.position.y > 23) {
          setGame((prevState) => ({ ...prevState, gameOver: true }));
          console.log(game.position.x, game.position.y);
        } else {
          setGame((prevState) => ({
            ...prevState,
            position: { x: prevState.position.x, y: prevState.position.y + 1 },
          }));
        }
        break;
      case "left":
        if (game.position.x < 1) {
          setGame((prevState) => ({ ...prevState, gameOver: true }));
          console.log(game.position.x, game.position.y);
        } else {
          setGame((prevState) => ({
            ...prevState,
            position: { x: prevState.position.x - 1, y: prevState.position.y },
          }));
        }

        break;
      case "right":
        if (game.position.x > 23) {
          setGame((prevState) => ({ ...prevState, gameOver: true }));
          console.log(game.position.x, game.position.y);
        } else {
          setGame((prevState) => ({
            ...prevState,
            position: { x: prevState.position.x + 1, y: prevState.position.y },
          }));
        }
        break;
      default:
        break;
    }

    //check if snake is eating itself
    game.body.forEach((bodyPart, index) => {
      if (index === 0) return;
      if (
        bodyPart.x === game.position.x &&
        bodyPart.y === game.position.y &&
        game.body.length > 3
      ) {
        setGame((prevState) => ({ ...prevState, gameOver: true }));
      }
    });

    //Move snake body

    setGame((prevState) => {
      const newBody = [...prevState.body];
      newBody.pop();
      newBody.unshift({ x: prevState.position.x, y: prevState.position.y });
      return { ...prevState, body: newBody };
    });

    //Check if snake is eating apple
    if (game.position.x === game.apple.x && game.position.y === game.apple.y) {
      setScore((prevState) => prevState + 1);
      setGame((prevState) => ({
        ...prevState,

        apple: {
          x: Math.floor(Math.random() * 22),
          y: Math.floor(Math.random() * 22),
        },
        body: [...prevState.body, { x: 0, y: 0 }],
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleGameLogic();
    }, 50);

    return () => clearInterval(interval);
  }, [keysPressed, game.direction, game]);

  const startGame = () => {
    setScore(0);
    setGame((prevState) => ({
      ...prevState,

      position: { x: 0, y: 0 },
      direction: "right",
      gameOver: false,
      body: [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
    }));
  };

  return (
    <div className="register-game-wrapper">
      <RegisterParticles show={stonks} />
      <div className="register-game-head">Create a game!</div>
      <div className="register-game-title">
        <h1>Snake Game</h1>
      </div>
      <div className="register-game-header">
        <button className="register-game-button" onClick={startGame}>
          New Game
        </button>
        <div className="register-game-score">Score: {score}</div>
      </div>

      <div className="register-game">
        <div
          className={`game-apple game-apple-${game.gameOver ? "dead" : ""}`}
          style={{ top: game.apple.y * 10, left: game.apple.x * 10 }}
        ></div>
        <div className="snake">
          {game.body.map((bodyPart, index) => {
            if (
              (bodyPart.x === 0 && bodyPart.y === 0) ||
              (bodyPart.x === game.position.x &&
                bodyPart.y === game.position.y) ||
              game.gameOver
            ) {
              return null;
            }
            return (
              <div
                className="snake-body"
                key={index}
                style={{ top: bodyPart.y * 10, left: bodyPart.x * 10 }}
              ></div>
            );
          })}
          <div
            className={`snake-head snake-head-${game.direction} snake-head-${
              game.gameOver ? "dead" : ""
            }`}
            style={{
              top: game.position.y * 10,
              left: game.position.x * 10,
            }}
          ></div>
        </div>
        {game.gameOver ? (
          <div className="game-over-message">Game Over </div>
        ) : (
          ""
        )}
      </div>
      <div className="register-game-head">Or make a website!</div>
      <button className="enable-stonks" onClick={() => setStonks(!stonks)}>
        Toggle Stonks
      </button>
    </div>
  );
};

export default RegisterGame;
