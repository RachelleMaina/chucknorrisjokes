import React, { useState } from "react";
import api from "../api";
import { createCtx } from "./createContext";

type DataContextProps = {
  children: React.ReactNode;
};

type Category = Array<string>;

type Joke = {
  categories: Array<string>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

type SavedJoke = Array<string>;

type SavedJokesSet = Set<string>;

const jokesFromLocalStorage: SavedJoke = JSON.parse(
  localStorage.getItem("chuck_norris_saved_jokes") || "[]"
);

type DataContextType = {
  // TODO: Preferably declare a category type and use it instead of any
  // TODO: @Racheal this is still not resolved - My apologies, I meant type as a general term, not the type keyword.
  // TODO: as an example, referencing the chucknorris API, categories can be declared as:
  // TODO: interface Category {
  // TODO:   id: number;
  // TODO:   name: string;
  // TODO: }
  categories: Category;
  jokesByCategories: Joke;
  dailyFeed: Array<Joke>;
  dataErr: string;
  savedJokes: SavedJoke;
  catLoading: boolean;
  dailyFeedLoading: boolean;
  jokesByCatLoading: boolean;
  getCategories: () => void;
  getJokesByCategories: (category: string) => void;
  getDailyFeed: () => void;
  saveJoke: (value: string) => void;
};

const [useDataContext, CtxProvider] = createCtx<DataContextType>();

export const DataContextProvider = ({ children }: DataContextProps) => {
  const [categories, setCategories] = useState<Category>([]);
  const [jokesByCategories, setJokesByCategories] = useState<Joke>({
    categories: [],
    created_at: "",
    icon_url: "",
    id: "",
    updated_at: "",
    url: "",
    value: "",
  });

  const [dailyFeed, setDailyFeed] = useState<Array<Joke>>([
    {
      categories: [],
      created_at: "",
      icon_url: "",
      id: "",
      updated_at: "",
      url: "",
      value: "",
    },
  ]);
  const [savedJokes, setSavedJokes] = useState<SavedJoke>(
    jokesFromLocalStorage
  );
  const [dataErr, setDataErr] = useState("");
  const [catLoading, setCatLoading] = useState(true);
  const [dailyFeedLoading, setDailyFeedLoading] = useState(true);
  const [jokesByCatLoading, setJokesByCatLoading] = useState(false);

  const getCategories = async () => {
    try {
      const res = await api.get("jokes/categories");
      setCategories(res.data);
    } catch (error) {
      setDataErr("An error occurred. Please try again later.");
    } finally {
      setCatLoading(false);
    }
  };

  const getJokesByCategories = async (category: string) => {
    try {
      setJokesByCatLoading(true);
      const res = await api.get(`jokes/random?category=${category}`);
      setJokesByCategories(res.data);
    } catch (error) {
      setDataErr("An error occurred. Please try again later.");
    } finally {
      setJokesByCatLoading(false);
    }
  };
  const getDailyFeed = async () => {
    try {
      const res = await api.get("feed/daily-chuck");
      const topHits = res.data.issues.slice(0, 40);
      const feed: any = await Promise.all(
        topHits.map((joke: { joke_id: string }) =>
          api(`jokes/${joke.joke_id}`)
            .then(({ data }) => data)
            .catch(() => {
              setDataErr("An error occurred. Please try again later.");
            })
        )
      );

      setDailyFeed(feed);
    } catch (error) {
      setDataErr("An error occurred. Please try again later.");
    } finally {
      setDailyFeedLoading(false);
    }
  };

  const saveJoke = (value: string) => {
    // TODO: Preferably use types instead of any. @Racheal this is still not resolved
    // TODO: @Rachel, my apologies again, I meant type as a general term, not the type keyword.
    // TODO: So alternatively, the savedJokesSet can be declared as:
    // TODO: savedJokesSet: Set<string> = new Set(savedJokes);
    let savedJokesSet: SavedJokesSet = new Set(savedJokes);

    //toggle between removing and saving
    if (savedJokesSet.has(value)) {
      savedJokesSet.delete(value);
    } else {
      savedJokesSet.add(value);
    }

    // store array in local storage
    let savedJokesArr: SavedJoke = Array.from(savedJokesSet);
    localStorage.setItem(
      "chuck_norris_saved_jokes",
      JSON.stringify(savedJokesArr)
    );
    setSavedJokes(savedJokesArr);
  };

  return (
    <CtxProvider
      value={{
        categories,
        jokesByCategories,
        dailyFeed,
        dataErr,
        savedJokes,
        catLoading,
        dailyFeedLoading,
        jokesByCatLoading,
        saveJoke,
        getCategories,
        getJokesByCategories,
        getDailyFeed,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export { useDataContext };
