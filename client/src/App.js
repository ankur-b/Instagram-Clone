import React, { useEffect, createContext, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Reset from "./components/screens/ResetPassword";
import Newpassword from './components/screens/Newpassword'
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts";
import { Route, BrowserRouter, useHistory, Switch } from "react-router-dom";
import { Provider as AuthProvider } from "./Context/AuthContext";
import { Context as AuthContext } from "./Context/AuthContext";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {TryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user&&token) {
      TryLocalSignin({history}) 
    } else {
      // if (!history.location.pathname.startsWith("/reset"))
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/createpost" component={CreatePost} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/myfollowing" component={SubscribedUserPosts} />
       {/* <Route exact path="/reset" component={Reset} />
      <Route path="/reset/:token" component={Newpassword} /> */}
    </Switch>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
