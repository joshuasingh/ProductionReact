export default (state = { timeout: "off" }, action) => {
  switch (action.type) {
    case "setTimeout":
      console.log("set login time called", action.payload);
      state = { logInTime: action.payload };
      break;
    default:
      break;
  }
  return state;
};
