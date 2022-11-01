import { Auth } from "./containers/Auth";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./containers/Home";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "./components/ProtectedRoute";
import Saved from "./containers/Saved";
import Category from "./containers/Category";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import { useLocation } from "react-router";
import { useDataContext } from "./context/DataContext";

function App() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    authenticationPath: "/auth",
  };

  const isAuthenticated: boolean = JSON.parse(
    localStorage.getItem( "chuck_norris_is_authenticated" ) || "false"
  );

  const { catLoading } = useDataContext()
  
  const location = useLocation();

  return (
    <>
      {(isAuthenticated || location.pathname === "/") && <Navbar />}
      <div className="container">
        {((isAuthenticated || location.pathname === "/") && !catLoading ) && <Categories />}

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
    </>
  );
}

export default App;
