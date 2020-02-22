import React from "react";
import SignInForm from "../components/AdminComponents/SignInForm";
import { connect } from "react-redux";
import AdminPage from "./AdminPage";
import jwt from "jsonwebtoken";

class AdminLogin extends React.Component {
  loginForm = {
    "padding-bottom": "3vh"
  };

  render() {
    console.log("admin login rendering ", this.props.user1.loggedIn);
    return (
      <>
        {this.props.user1.loggedIn === false ? (
          <div className="row " style={this.loginForm}>
            <div className="col-md-4 col-md-offset-4 AdminLoginForm">
              <SignInForm setUserInfo={this.props.setUserInfo} />
            </div>
          </div>
        ) : (
          <AdminPage
            mainData={this.props.mainData}
            fetchData={this.props.fetchData}
          />
        )}
      </>
    );
  }

  componentWillMount() {
    if (localStorage.getItem("jwtToken")) {
      if (this.props.user1.loggedIn === false) {
        console.log(
          "in update login",
          jwt.decode(localStorage.getItem("jwtToken"))
        );
        this.props.setUserInfo(jwt.decode(localStorage.getItem("jwtToken")));
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user1: state.authReducer,
    getNavData: state.NavbarReduce
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "login",
        payload: name
      });
    },
    InitiateNavBar: val => {
      dispatch({
        type: "InitiateNavBar",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);
