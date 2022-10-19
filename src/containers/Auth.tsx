import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignin, setIsSignin] = useState(true);
  const { authErr, signin, signup } = useContext(AuthContext);

  const userSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(username, password);
  };

  const userSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signin(username, password);
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <img
          src={require("../assets/images/chucknorris_logo.png")}
          alt=""
          width="150"
        />
      </div>
      <form onSubmit={isSignin ? userSignin : userSignup}>
        <h1 className="form-header"> {isSignin ? "Sign In" : "Sign Up"}</h1>
        <h2 className="form-welcome"> Welcome to chucknorris jokes</h2>
        {authErr && <p className="form-error">{authErr}</p>}
        <input
          className="username-input"
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
        <input
          className="password-input"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />

        {/*TODO: Preferably set a type='submit' for purposes of clear code*/}
        <button className="auth-btn">
          {isSignin ? "Log in" : "Create Account"}
        </button>
        <p className="dont-have-account">
          {isSignin ? "Not a member? " : "Already have an account? "}

          <span
            className="create-an-account"
            onClick={() => setIsSignin(!isSignin)}
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};
