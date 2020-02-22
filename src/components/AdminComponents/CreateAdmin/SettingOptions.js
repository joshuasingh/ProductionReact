import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";
import CreateAdmin from "./CreateAdmin";
import ViewAllAdmin from "./ViewAllAdmin";

class SettingOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choosen: -1
    };

    this.changeTab1 = this.changeTab1.bind(this);
    this.changeTab2 = this.changeTab2.bind(this);
    this.checkForRights = this.checkForRights.bind(this);
  }

  //changing tab on click
  changeTab1(e) {
    this.props.selection(1);
  }

  //changing tab on click
  changeTab2(e) {
    this.props.selection(3);
  }

  textStyle = {
    "font-Size": "1%"
  };

  //choosong menu
  chooseMenu() {
    return (
      <>
        <div
          className="choosingOpt1"
          onClick={e => {
            this.changeTab1(e);
          }}
        >
          <h1 style={this.textStyle}>Create New Admin</h1>
        </div>
        <div
          className="choosingOpt2"
          style={this.outline}
          onClick={e => {
            this.changeTab2(e);
          }}
        >
          <h1>View Other Admins</h1>
        </div>
      </>
    );
  }

  checkForRights() {
    if (this.props.userRights.master === "no") {
      this.props.selection(2);
    }
  }

  notAuthorize() {
    return (
      <>
        <div>You're not authorized for it......</div>
      </>
    );
  }

  componentWillMount() {
    this.checkForRights();
  }

  render() {
    console.log(
      "getting setting option allllllladminnnnnnn",
      this.props.userRights.allAdmin
    );

    return (
      <>
        {this.props.DisplayOpt.choosen === -1 ? this.chooseMenu() : " "}
        {this.props.DisplayOpt.choosen === 1 ? <CreateAdmin /> : " "}
        {this.props.DisplayOpt.choosen === 2 ? this.notAuthorize() : " "}
        {this.props.DisplayOpt.choosen === 3 ? <ViewAllAdmin /> : " "}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView,
    DisplayOpt: state.AdminSettingSel,
    userRights:state.AdminLoginRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "update",
        payload: name
      });
    },
    initialize: name => {
      dispatch({
        type: "initial",
        payload: name
      });
    },
    selection: val => {
      dispatch({
        type: "toggle",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingOptions);
