import axios from "axios";

const authReducer = (state = { user: {}, loggedIn: false }, action) => {
  switch (action.type) {
    case "login":
      console.log("putting all the admin info in redux store");
      state = {
        user: action.payload,

        loggedIn: true
      };
      break;
    case "logOut":
      console.log("logut called");
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("persistedArray");
      localStorage.removeItem("logInTime");

      state = { user: {}, loggedIn: false };
      break;
    default:
      break;
  }
  return state;
};

export default authReducer;
