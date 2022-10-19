import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";

type DataContextProps = {
  children: React.ReactNode;
};
type ContextValue = {
  // TODO: Preferably declare a category type and use it instead of any
  categories: Array<any>;
  jokesByCategories: Array<any>;
  dailyFeed: Array<any>;
  dataErr: string;
  savedJokes: Array<string>;
  getCategories: () => void;
  getJokesByCategories: (category: string) => void;
  getDailyFeed: () => void;
  saveJoke: (jokeId: string, value: string) => void;
};

export const DataContext = React.createContext<ContextValue>({
  categories: [],
  jokesByCategories: [],
  dailyFeed: [],
  dataErr: "",
  savedJokes: [],
  getCategories: () => {},
  getJokesByCategories: (category: string) => {},
  getDailyFeed: () => {},
  saveJoke: (jokeId: string, value: string) => {},
});

const DataContextProvider = ({ children }: DataContextProps) => {
  const [categories, setCategories] = useState([]);
  const [jokesByCategories, setJokesByCategories] = useState([]);
  const [dailyFeed, setDailyFeed] = useState([]);
  // TODO: Saved jokes do not reflect on page refresh - You can initialize this array to what's
  // TODO: already in your local storage or use a useEffect hook to update the state with what's already
  // TODO: in local storage.
  const [savedJokes, setSavedJokes] = useState([]);
  const [dataErr, setDataErr] = useState("");

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const res = await api.get("jokes/categories");
      setCategories(res.data);
    } catch {
      setDataErr("An error occurred. Please try again later.");
    }
  };

  const getJokesByCategories = async (category: string) => {
    try {
      const res = await api.get(`jokes/random?category=${category}`);
      setJokesByCategories(res.data);
      navigate("/category", { state: { category } });
    } catch {
      setDataErr("An error occurred. Please try again later.");
    }
  };
  const getDailyFeed = async () => {
    try {
      const res = await api.get("feed/daily-chuck");
      const topHits = res.data.issues.slice(0, 40);
      const feed: any = await Promise.all(
        topHits.map((joke: { joke_id: string }) =>
            //TODO: I'm guessing this might fail (since its a data fetch) - you might want to handle that
          api(`jokes/${joke.joke_id}`).then(({ data }) => data)
        )
      );

      setDailyFeed(feed);
    } catch (e) {
      setDataErr("An error occurred. Please try again later.");
    }
  };

  const saveJoke = (jokeId: string, value: string) => {
    // TODO: Preferably use types instead of any.
    // TODO: Also, you can use a Set (which in javascript is O(1) instead of O(n) for lookup in cases of array)
    // TODO: Set's are also easy to use intuitively - they cannot duplicate values
    const savedJokes = JSON.parse(
      localStorage.getItem("chuck_norris_saved_jokes") || "[]"
    );
    const index = savedJokes.indexOf(jokeId);
    //joke not saved
    if (index === -1) {
      savedJokes.push(jokeId);
    } else {
      savedJokes.splice(index, 1);
    }
    // store array in local storage
    localStorage.setItem(
      "chuck_norris_saved_jokes",
      JSON.stringify(savedJokes)
    );
    setSavedJokes(savedJokes);
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        jokesByCategories,
        dailyFeed,
        dataErr,
        savedJokes,
        saveJoke,
        getCategories,
        getJokesByCategories,
        getDailyFeed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
