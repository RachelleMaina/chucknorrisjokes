import React, { useEffect } from "react";
import { useDataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Category = () => {
  //  TODO: I assume you also meant to call getJokesByCategories() here maybe in a useEffect hook?
  // TODO: [dataErr] is not used. You can remove it / use it.
  const {
    jokesByCategories,
    dataErr,
    savedJokes,
    jokesByCatLoading,
    saveJoke,
    getJokesByCategories,
  } = useDataContext();
  const location = useLocation();

  useEffect(() => {
    getJokesByCategories(location.state.category);
  }, [location]);

  return (
    <>
      {jokesByCatLoading ? (
        <div className="loader">Loading...</div>
      ) : dataErr ? (
        <div className="error">{dataErr}</div>
      ) : (
        <div className="daily-feed-wrapper">
          {/*TODO: You are still looping through [dailyFeed] - I assume you meant to loop through [jokesByCategories]? */}

          <div className="joke-by-cat-wrapper">
            <p className="joke-tag">{location.state.category}</p>
            <p>{jokesByCategories.value}</p>
            <div className="joke-by-cat-footer">
              <div
                className="joke-by-cat-footer-btn"
                onClick={() => getJokesByCategories(location.state.category)}
              >
                New Joke
              </div>

              <div
                className="joke-fav-icon"
                onClick={() => saveJoke(jokesByCategories.value)}
              >
                {/*  TODO: Using a set here would make this constant time, instead of O(n) which now in this case would be O(n) * O(n) = O(n^2), considering the first loop */}
                {new Set(savedJokes).has(jokesByCategories.value) ? (
                  <AiFillHeart size={25} className="fav-icon" />
                ) : (
                  <AiOutlineHeart size={25} className="fav-icon" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
