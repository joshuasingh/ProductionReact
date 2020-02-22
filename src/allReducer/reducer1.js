export default (state = { name1: "joshua" }, action) => {
  switch (action.type) {
    case "changeName":
      console.log("change called", action.payload);
      state = { ...state, name1: action.payload };
      break;
    default:
      break;
  }
  return state;
};
