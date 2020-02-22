const NavbarReduce = (state = { NavbarDets: null }, action) => {
  switch (action.type) {
    case "InitiateNavBar":
      state = { NavbarDets: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default NavbarReduce;
