import axios from "axios";

export default function setAuthorizationHeader(token) {
  console.log("setting log", token);
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
}
