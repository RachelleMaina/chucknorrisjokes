import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCtx } from "./createContext";

type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  // TODO: Use camelCase for variable names
  signUp: (username: string, password: string) => void;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  authErr: string;
};

const [useAuthContext, CtxProvider] = createCtx<AuthContextType>();

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [authErr, setAuthErr] = useState("");

  const navigate = useNavigate();

  const signIn = (username: string, password: string) => {
    //check if username supplied exists else show error
    // TODO: It's better to define actual types for the data you're working with.
    // Helps identify bugs @ compile time and also helps with code readability
    const existingCreds = JSON.parse(
      localStorage.getItem("chuck_norris_credentials") || "[]"
    );

    const correctCreds = existingCreds.some(
      (item: { username: String; password: String }) =>
        item.username === username && item.password === password
    );
    if (correctCreds) {
      localStorage.setItem("chuck_norris_is_authenticated", "true");
      setAuthErr("");

      //navigate to homepage
      navigate("/");
    } else {
      setAuthErr("Incorrect username or password");
    }
  };

  const signUp = (username: string, password: string) => {
    //check if username supplied exists else store username, password
    const existingCreds = JSON.parse(
      localStorage.getItem("chuck_norris_credentials") || "[]"
    );
    const usernameExists = existingCreds.some(
      (item: { username: String }) => item.username === username
    );
    if (usernameExists) {
      setAuthErr("This username already exists.");
    } else {
      let creds = [...existingCreds];
      if (username && password) {
        const newCreds = { username, password };
        creds.push(newCreds);
        localStorage.setItem("chuck_norris_credentials", JSON.stringify(creds));
        localStorage.setItem("chuck_norris_is_authenticated", "true");
        setAuthErr("");
        //navigate to homepage
        navigate("/");
      } else {
        setAuthErr("Username and password are required.");
      }
    }
  };

  const signOut = () => {
    localStorage.setItem("chuck_norris_is_authenticated", "false");
    //navigate to auth form
    navigate("/auth");
  };

  return (
    <CtxProvider value={{ signUp, signIn, signOut, authErr }}>
      {children}
    </CtxProvider>
  );
};
export { useAuthContext };