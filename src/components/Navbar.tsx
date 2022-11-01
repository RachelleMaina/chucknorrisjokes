import { useNavigate } from "react-router";
import { useDataContext } from "../context/DataContext";
import { AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { savedJokes } = useDataContext();
  const { signOut } = useAuthContext();
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(
    localStorage.getItem("chuck_norris_is_authenticated") || "false"
  );

  const handleClick = () => {
    isAuthenticated ? signOut() : navigate("/auth");
  };

  return (
    <div className="navbar-container">
      <img
        src={require("../assets/images/chucknorris_logo.png")}
        alt=""
        height="50"
        onClick={() => navigate("/")}
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
