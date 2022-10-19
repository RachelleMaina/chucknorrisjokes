import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router";

const Categories = () => {
  // TODO: Maybe you can use nullable values instead for cases where you'd like to force
  // TODO: users of this component to wrap it inside a DataContextProvider
  const { categories, getDailyFeed, getCategories, getJokesByCategories } =
    useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cat: string
  ) => {
    // TODO: This line can be moved to a standalone function since it's duplicated.
    event.currentTarget.classList.toggle("active-cat");
    getJokesByCategories(cat);
  };
  const handleClickAll = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.currentTarget.classList.toggle("active-cat");
    getDailyFeed();
    navigate("/");
  };
  return (
    <div className="joke-cat-wrapper">
      <div className="joke-cat" onClick={(event) => handleClickAll(event)}>
        All jokes&nbsp;
        <AiOutlineArrowRight size={20} />
      </div>
      {categories.map((cat, i) => (
        <div
          className="joke-cat"
          key={i}
          onClick={(event) => handleClick(event, cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
};

export default Categories;
