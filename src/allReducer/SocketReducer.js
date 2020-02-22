const SocketReducer = (state = { sockCon: null }, action) => {
  switch (action.type) {
    case "InitiateSocketConnection":
      console.log("socket connection set in reducer");
      state = { sockCon: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default SocketReducer;
