import { Auth } from "./containers/Auth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./containers/Home";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/ProtectedRoute";
import Saved from "./containers/Saved";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import Category from "./containers/Category";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import { useLocation } from "react-router";

function App() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    authenticationPath: "/auth",
  };
  const isAuthenticated = JSON.parse(
    localStorage.getItem("chuck_norris_is_authenticated") || "false"
  );
  const location = useLocation();

  return (
    <AuthContextProvider>
      <DataContextProvider>
        {(isAuthenticated || location.pathname === "/") && <Navbar />}

        <div className="container">
          {(isAuthenticated || location.pathname === "/") && <Categories />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route
              path="saved"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<Saved />}
                />
              }
            />
            <Route
              path="category"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<Category />}
                />
              }
            />
          </Routes>
        </div>
      </DataContextProvider>
    </AuthContextProvider>
  );
}

export default App;
