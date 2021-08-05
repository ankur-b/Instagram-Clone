import React, { useEffect, createContext, useContext, useReducer } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { Route, useHistory, Switch } from "react-router-dom";
import { reducer, initialState } from "./reducer/userReducer";
import {Provider as AuthProvider} from "./Context/AuthContext"
import {Context as AuthContext} from './Context/AuthContext' 
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state } = useContext(AuthContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      console.log(token)
      console.log(user)
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/createpost" component={CreatePost} />
    </Switch>
  );
};

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routing />
    </AuthProvider>
  );
}

export default App;
