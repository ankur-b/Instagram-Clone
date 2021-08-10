import createDataContext from "./createDataContext";
import M from "materialize-css";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SIGNUP":
      return { errorMessage: "", token: action.payload, user: action.user };
    case "SIGNIN":
      return { errorMessage: "", token: action.payload, user: action.user };
    case "SIGNOUT":
      return { errorMessage: "", token: null, user: null };
    case "UPDATE":
      return {
        errorMessage: "",
        token: action.payload,
        user: action.user,
      };
    default:
      return state;
  }
};
const TryLocalSignin =
  (dispatch) =>
  ({ history }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch({ type: "SIGNIN", payload: token, user: user });
    } else {
      history.push("/login");
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
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(localStorage.getItem("user"));
          dispatch({ type: "SIGNIN", payload: data.token, user: data.user });
          M.toast({ html: "Signedup Successfully" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
const Signup =
  (dispatch) =>
  ({ name, email, password, history,url }) => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        pic:url
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
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "signup", payload: data.token, user: data.user });
          M.toast({ html: data.message });
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };
const Signout =
  (dispatch) =>
  ({ history }) => {
    localStorage.clear();
    dispatch({ type: "SIGNOUT" });
    history.push("/login");
  };
const Follow =
  (dispatch) =>
  ({ userid }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      fetch("/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          followId: userid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          console.log(data);
          dispatch({
            type: "UPDATE",
            payload: token,
            user: data,
          });
        });
    }
  };
const unFollow =
  (dispatch) =>
  ({ userid }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      fetch("/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          unfollowId: userid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          console.log(data);
          dispatch({
            type: "UPDATE",
            payload: token,
            user: data,
          });
        });
    }
  };
export const { Provider, Context } = createDataContext(
  AuthReducer,
  { Signup, Signin, Signout, TryLocalSignin, Follow, unFollow },
  { token: null, errorMessage: "", user: null }
);
