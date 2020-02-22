import { combineReducers } from "redux";
import reducer1 from "./allReducer/reducer1";
import authReducer from "./allReducer/authReducer";
import AdminDetailView from "./allReducer/AdminDetailView";
import addingImageRed from "./allReducer/addingImageRed";
import AdminLoginRights from "./allReducer/AdminLoginRights";
import AdminSettingSel from "./allReducer/AdminSettingSel";
import ImageSelection from "./allReducer/ElabContainer/ImageSelection";
import Referencing from "./allReducer/ElabContainer/Referencing";
import ShowExpandedImage from "./allReducer/ElabContainer/ShowExpandedImage";
import NavbarReduce from "./allReducer/NavbarReduce";
import adminUpperMenu from "./allReducer/adminUpperMenu";
import adminSideNavRed from "./allReducer/adminSideNavRed";
import adminDetailViewRed from "./allReducer/adminDetailViewRed";
import timeKeeper from "./allReducer/timeKeeper";
import SocketReducer from "./allReducer/SocketReducer";

export default combineReducers({
  reducer1,
  adminSideNavRed,
  adminDetailViewRed,
  AdminDetailView,
  addingImageRed,
  AdminLoginRights,
  AdminSettingSel,
  ImageSelection,
  Referencing,
  ShowExpandedImage,
  NavbarReduce,
  adminUpperMenu,
  authReducer,
  timeKeeper,
  SocketReducer
});
