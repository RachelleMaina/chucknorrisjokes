import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Home = () => {
  const {
    dailyFeed,
    dataErr,
    savedJokes,
    saveJoke,
    getCategories,
    getDailyFeed,
  } = useContext(DataContext);

  useEffect(() => {
    getCategories();
    getDailyFeed();
  }, []);

  return (
    <>
      <div className="daily-feed-wrapper">
        {dataErr && <div>{dataErr}</div>}
        {dailyFeed.map((joke) => (
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
        ))}
      </div>
    </>
  );
};

export default Home;
