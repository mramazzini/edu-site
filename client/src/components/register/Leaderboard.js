import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SNAKE_LEADERBOARD } from "../utils/queries";
import { ADD_SNAKE_PLAYER } from "../utils/mutations";

const Leaderboard = ({ score }) => {
  const [formState, setFormState] = useState({ username: "" });
  const [addToLeaderBoardFade, setAddToLeaderBoardFade] = useState(false);
  const { loading, data } = useQuery(SNAKE_LEADERBOARD);
  const [addSnakePlayer] = useMutation(ADD_SNAKE_PLAYER);

  const snakeLeaderboard = data?.snakeLeaderBoard || [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addSnakePlayer({
        variables: {
          username: formState.username,
          score: score,
        },
      });
      if (response.data.addSnakePlayer) {
        setAddToLeaderBoardFade(true);
        setTimeout(() => {
          setAddToLeaderBoardFade(false);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getChar = (index) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return index + 1;
    }
  };
  const handleLeaderBoard = () => {
    window.location.reload();
  };

  return (
    <div className="leaderboard">
      <form className="snake-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="username"
          placeholder="Input name"
          id="username"
          name="username"
        />
        <button
          onClick={handleLeaderBoard}
          type="submit"
          className="snake-form-button"
        >
          Add to leaderboard!
        </button>
      </form>
      <div
        className={`added-to-leaderboard ${addToLeaderBoardFade ? "show" : ""}`}
      >
        <p>Added to leaderboard! </p>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="podium">
          <h2>Leaderboard</h2>
          {snakeLeaderboard.map((player, index) => (
            <div key={player._id} className="podium-section">
              <div className="podium-place">{getChar(index)}</div>
              <p>
                {player.username}: {player.score}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
