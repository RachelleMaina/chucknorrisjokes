import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Category = () => {
  const { dailyFeed, dataErr, savedJokes, saveJoke } = useContext(DataContext);
  const location = useLocation();

  return (
    <>
      <div className="daily-feed-wrapper">
        {dailyFeed.map((joke) => (
          <div className="daily-feed" key={joke.id}>
            <p className="joke-tag">{location.state.category}</p>
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
        ))}
      </div>
    </>
  );
};

export default Category;
