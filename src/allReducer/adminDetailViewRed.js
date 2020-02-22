export default (state = { index:-1 }, action) => {
  switch (action.type) {
    case "setAdminDetailSelection":
     state={index:action.payload}
      break;
   case "logoutOnAdmin":
     state={index:-1}
      break;
    default:
      break;
  }
  return state;
};
