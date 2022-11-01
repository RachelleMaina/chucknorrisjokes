import React, {useState, useEffect} from "react";
import {useDataContext} from "../context/DataContext";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useNavigate} from "react-router";

const Categories = () => {
    const [selectedCat, setSelectedCat] = useState("all jokes");

    const {categories, dataErr, getDailyFeed, getCategories} = useDataContext();

    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const setActiveClass = (cat: string) => {
        setSelectedCat(cat);
    };

    const handleClick = (cat: string) => {
        setActiveClass(cat);
        navigate("/category", {state: {category: cat}});
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
                <AiOutlineArrowRight size={20}/>
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
