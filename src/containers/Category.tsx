import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Category = () => {
  //  TODO: I assume you also meant to call getJokesByCategories() here maybe in a useEffect hook?
    // TODO: [dataErr] is not used. You can remove it / use it.
  const { dailyFeed, dataErr, savedJokes, saveJoke } = useContext(DataContext);
  const location = useLocation();

  return (
    <>
      <div className="daily-feed-wrapper">
        {/*TODO: You are still looping through [dailyFeed] - I assume you meant to loop through [jokesByCategories]? */}
        {dailyFeed.map((joke) => (
          <div className="daily-feed" key={joke.id}>
            <p className="joke-tag">{location.state.category}</p>
            <p>{joke.value}</p>
            <div
              className="joke-fav-icon"
              onClick={() => saveJoke(joke.id, joke.value)}
            >
              {/*  TODO: Using a set here would make this constant time, instead of O(n) which now in this case would be O(n) * O(n) = O(n^2), considering the first loop */}
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
