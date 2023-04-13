import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { COUNT_WEBSOCKET } from "../utils/subscriptions";
import { INCREMENT_COUNT } from "../utils/mutations";
import { GET_COUNT } from "../utils/queries";
import boopSfx from "../../assets/clap.wav";
import useSound from "use-sound";
const LoginGame = () => {
  const { data, loading, error } = useQuery(GET_COUNT);
  const [highFive, setHighFive] = useState(false);
  const [count, setCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [mute, setMute] = React.useState(false);

  const [play] = useSound(boopSfx);
  useSubscription(COUNT_WEBSOCKET, {
    onSubscriptionData: async ({ subscriptionData }) => {
      const payload = await subscriptionData.data.loginCountSubscription;
      console.log(payload);
      setCount(() => payload);
    },
  });
  const [incrementCount] = useMutation(INCREMENT_COUNT);

  const handleIncrement = async () => {
    play();
    setHighFive(true);
    setTimeout(() => {
      setHighFive(false);
    }, 500);
    try {
      const { data } = await incrementCount();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error: {error.message}</p>;
  }
  if (!initialized) {
    setCount(data.getLoginCount);
    setInitialized(true);
  }

  return (
    <div className="login-game">
      <h1>Welcome Back!</h1>
      <div className="login-game-container">
        <div className="login-count"> {count} people have high-fived Jerry</div>
        {!highFive ? (
          <div className="login-game-image">
            <div className="login-image-inactive" />
          </div>
        ) : (
          <div className="login-game-image">
            <div className="login-image-active" />
          </div>
        )}
      </div>
      <button className="high-five-button" onClick={handleIncrement}>
        Give Jerry a high five
      </button>
    </div>
  );
};

export default LoginGame;
