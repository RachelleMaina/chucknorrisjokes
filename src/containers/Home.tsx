import { useEffect } from "react";
import { useDataContext } from "../context/DataContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Home = () => {
  const {
    dailyFeed,
    dataErr,
    savedJokes,
    dailyFeedLoading,
    saveJoke,
    getCategories,
    getDailyFeed,
  } = useDataContext();

  useEffect(() => {
    getCategories();
    getDailyFeed();
  }, []);

  return (
    <>
      {dailyFeedLoading ? (
        <div className="loader">Loading...</div>
      ) : dataErr ? (
        <div className="error">{dataErr}</div>
      ) : (
        <div className="daily-feed-wrapper">
          {dataErr && <div>{dataErr}</div>}
          {dailyFeed.map((joke) => (
            <div className="daily-feed" key={joke.id}>
              <p>{joke.value}</p>
              <div
                className="joke-fav-icon"
                onClick={() => saveJoke(joke.value)}
              >
                {new Set(savedJokes).has(joke.value) ? (
                  <AiFillHeart size={25} className="fav-icon" />
                ) : (
                  <AiOutlineHeart size={25} className="fav-icon" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
