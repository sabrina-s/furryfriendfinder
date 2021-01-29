import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Dogs from "./Dogs/Dogs";
import LoginPage from "./Users/LoginPage";
import RegistrationPage from "./Users/RegistrationPage";
import SettingsPage from "./Users/SettingsPage";
import { UserContext } from "./Users/UserContext";
import { useCurrentUserHook } from "./useCurrentUserHook";

function App() {
  const { currentUser, setCurrentUser } = useCurrentUserHook();

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Navbar setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path="/" exact component={Dogs} />
          <Route
            path="/login"
            render={() => <LoginPage setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/register"
            render={() => <RegistrationPage setCurrentUser={setCurrentUser} />}
          />
          {currentUser && <Route path="/settings" component={SettingsPage} />}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
