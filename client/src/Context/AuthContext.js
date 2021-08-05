import createDataContext from "./createDataContext";
import M from "materialize-css";
import { useHistory, Redirect } from "react-router-dom";
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNUP":
      return { errorMessage: "", token: action.payload, user: action.user };
    case "SIGNIN":
      return { errorMessage: "", token: action.payload, user: action.user };
    case "SIGNOUT":
      return {errorMessage:"",token:null,user:null}
    default:
      return state;
  }
};
const Signin =
  (dispatch) =>
  ({ email, password, history }) => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          dispatch({ type: "SIGNIN", payload: data.token, user: data.user });
          M.toast({ html: "Signedup Successfully" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
const Signup =
  (dispatch) =>
  ({ name, email, password, history }) => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({
            type: "ADD_ERROR",
            payload: data.error,
          });
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          dispatch({ type: "signup", payload: data.token, user: data.user });
          M.toast({ html: data.message });
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };
const Signout=dispatch=>({history})=>{
  localStorage.clear();
  dispatch({ type: "SIGNOUT" });
  history.push('/login')
}
export const { Provider, Context } = createDataContext(
  AuthReducer,
  { Signup, Signin,Signout },
  { token: null, errorMessage: "", user: null }
);
