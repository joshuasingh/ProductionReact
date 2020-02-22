const AdminLoginRights = (state = { master: "", allAdmin: {} }, action) => {
  switch (action.type) {
    case "updateRights":
      console.log("master update is called", action.payload);
      state = {
        master: action.payload.master,
        allAdmin: action.payload.allAdmin
      };
      break;
    case "AllAdminDetails":
      state = { allAdmin: action.payload };
      break;
    case "updateAdminList":
      state = { allAdmin: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default AdminLoginRights;
