const AdminDetailView = (state = { mainData: [] }, action) => {
  switch (action.type) {
    case "update":
      console.log("%c update is called", "color:red");
      console.log("mainData in update", action.payload);
      state = { mainData: action.payload };
      break;
    case "initial":
      console.log("%c initialized called in reducer", "color:red");
      console.log("the payload is ", action.payload);
      state = { mainData: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default AdminDetailView;
