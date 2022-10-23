import React, { useState, useEffect } from "react";
import { useDataContext } from "../context/DataContext";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router";

const Categories = () => {
  const [selectedCat, setSelectedCat] = useState("all jokes");

  // TODO: Maybe you can use nullable values instead for cases where you'd like to force
  // TODO: users of this component to wrap it inside a DataContextProvider
  const { categories, dataErr, getDailyFeed, getCategories } = useDataContext();

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const setActiveClass = (cat: string) => {
    // TODO: This line can be moved to a standalone function since it's duplicated.
    setSelectedCat(cat);
  };

  const handleClick = (cat: string) => {
    setActiveClass(cat);
    navigate("/category", { state: { category: cat } });
  };

  const handleClickAll = () => {
    setActiveClass("all jokes");
    getDailyFeed();
    navigate("/");
  };
  return dataErr ? null : (
    <div className="joke-cat-wrapper">
      <div
        className={
          "joke-cat  " + (selectedCat === "all jokes" ? "active-cat" : "")
        }
        onClick={handleClickAll}
      >
        All jokes&nbsp;
        <AiOutlineArrowRight size={20} />
      </div>
      {categories.map((cat, i) => (
        <div
          className={"joke-cat  " + (selectedCat === cat ? "active-cat" : "")}
          key={i}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
};

export default Categories;
