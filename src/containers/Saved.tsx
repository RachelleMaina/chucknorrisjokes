import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router";

const Saved = () => {
  const { saveJoke, savedJokes, dailyFeed } = useContext(DataContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (savedJokes.length === 0) {
      navigate("/");
    }
  }, [savedJokes]);

  return (
    <div className="daily-feed-wrapper">
      {dailyFeed.map((joke, i) =>
        savedJokes.includes(joke.id) ? (
          <div className="daily-feed" key={joke.id}>
            <p>{joke.value}</p>
            <div
              className="joke-fav-icon"
              onClick={() => saveJoke(joke.id, joke.value)}
            >
              {savedJokes.includes(joke.id) ? (
                <AiFillHeart size={25} className="fav-icon" />
              ) : (
                <AiOutlineHeart size={25} className="fav-icon" />
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Saved;
