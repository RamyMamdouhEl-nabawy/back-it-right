import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "react-bootstrap/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.scss";

function App() {
  return (
    <div className="App back-right">
      <ToastContainer />
      <Router>
        <header className="mb-5">
          <Navbar className="back-right__header">
            <section className="container">
              <img
                src="images/full-logo.png"
                className="d-inline-block align-top back-right__logo"
                alt="ITWorx logo"
              />
              <div className="text-end">
                <div>
                  <nav>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <NavLink
                          to="/"
                          className="back-right__link"
                          activeClassName="back-right__link--active"
                        >
                          SignUp
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          className="back-right__link"
                          activeClassName="back-right__link--active"
                        >
                          Login
                        </NavLink>
                      </li>
                      {/* <li className="nav-item">
                        <NavLink
                          to="/home"
                          className="back-right__link"
                          activeClassName="back-right__link--active"
                        >
                          Back-it-Right
                        </NavLink>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
            </section>
          </Navbar>
        </header>
        <div className="container">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route
              path="/login"
              render={(route) => <Login route={route} />}
            ></Route>
            <Route
              path="/home"
              render={(route) => <Home route={route} />}
            ></Route>
            <Route
              path="/"
              exact
              render={(route) => <SignUp route={route} />}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
