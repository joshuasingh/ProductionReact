const AdminSettingSel = (state = { choosen: -1, adminDetails: {} }, action) => {
  switch (action.type) {
    case "toggle":
      state = { choosen: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default AdminSettingSel;
