import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { DataContext } from "../context/DataContext";
import { AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { savedJokes } = useContext(DataContext);
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(
    localStorage.getItem("chuck_norris_is_authenticated") || "false"
  );

  const handleClick = () => {
    isAuthenticated ? signout() : navigate("/auth");
  };

  return (
    <div className="navbar-container">
      <img
        src={require("../assets/images/chucknorris_logo.png")}
        alt=""
        height="50"
        onClick={()=>navigate("/")}
      />
      <div className="nav-right-items">
        {savedJokes.length > 0 && (
          <div
            className="nav-link saved-link"
            onClick={() => navigate("/saved")}
          >
            {" "}
            <AiOutlineHeart />
            &nbsp;Saved Jokes
          </div>
        )}
        <div className="nav-link" onClick={handleClick}>
          {isAuthenticated ? (
            <>
              <AiOutlineLogout />
              &nbsp;Signout
            </>
          ) : (
            "Sign in"
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
