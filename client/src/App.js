import React, { useEffect, createContext, useContext, useReducer } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import { reducer, initialState } from "./reducer/userReducer";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type:"USER",payload:user});
      console.log(user)
      history.push("/");
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
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
