import React, {  useEffect } from "react";
import {  useDataContext } from "../context/DataContext";
import {  AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router";

const Saved = () => {
  const { saveJoke, savedJokes } = useDataContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (savedJokes.length === 0) {
      navigate("/");
    }
  }, [savedJokes]);

  return (
    <div className="daily-feed-wrapper">
      {savedJokes.map((joke, i) => (
          <div className="daily-feed" key={i}>
            <p>{joke}</p>
            <div
              className="joke-fav-icon"
              onClick={() => saveJoke(joke)}
            >
            <AiFillHeart size={25} className="fav-icon" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Saved;
