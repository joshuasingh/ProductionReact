import React from "react";
import axios from "axios";
import setAuthorizationHeader from "./setAuthorizationHeader";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { Rolling } from "react-loading-io";
import moment from "moment";
import * as consta from "../constantValues";

class SignInForm extends React.Component {
  userName = "";
  password = "";
  formRef = null;
  loginTime = null;

  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      password: null,
      passwordErr: "",
      userNameErr: "",
      error: null
    };

    this.putLoginTime = this.putLoginTime.bind(this);
  }

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loaderAdminLogin" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={100} />
      </div>
    );
  };

  //error style
  errs = {
    color: "red"
  };

  setValues() {
    if (this.state.userName === null && this.state.password === null) {
      console.log(" both wrong called");
      this.setState({
        userNameErr: "userName cannot be Empty ",
        passwordErr: "password cannot be Empty",
        error: null
      });
    } else {
      if (this.state.userName === null) {
        console.log(" username wrong called");
        this.setState({
          userNameErr: "userName cannot be Empty ",
          passwordErr: null,
          error: null
        });
      } else if (this.state.password === null) {
        console.log(" password wrong called");
        this.setState({
          userNameErr: null,
          passwordErr: "password cannot be Empty",
          error: null
        });
      } else {
        // const data = {
        //   email: this.state.userName,
        //   password: this.state.password
        // };

        const data = {
          email: "joshuasinf52@gmail.com",
          password: "sdfsdfsdff"
        };

        //showing the loader
        this.loaderRef.style.display = "inline";

        //diming the background
        this.formRef.style.opacity = 0.2;

        axios
          .post("https://nh65v.sse.codesandbox.io/adminLoginRequest", data)
          .then(
            res => {
              if (res.data.token) {
                console.log(res.data.token);
                localStorage.setItem("jwtToken", res.data.token);

                setAuthorizationHeader(res.data.token);
                var user = jwt.decode(res.data.token);
                var allAdmin = res.data.AllAdminDetail;

                this.loaderRef.style.display = "none";

                this.props.setUserInfo(user);

                this.putLoginTime();

                if (user.master === "no") {
                  this.props.updateRights({
                    master: user.master,
                    allAdmin: {}
                  });
                } else {
                  this.props.updateRights({
                    master: user.master,
                    allAdmin: allAdmin
                  });
                }
              } else {
                if (res.data.status === "invalid") {
                  this.setState({
                    error: "The entered Email or Password is Invalid",
                    userNameErr: null,
                    passwordErr: null
                  });
                } else if (res.data.status === "InternalError") {
                  this.setState({
                    error: "An error occured ,please try again",
                    userNameErr: null,
                    passwordErr: null
                  });
                }

                this.loaderRef.style.display = "none";
                this.formRef.style.opacity = 1;
              }
            },
            err => {
              alert("couldn't verify,please try again");
              this.loaderRef.style.display = "none";
              this.formRef.style.opacity = 1;
            }
          );
      }
    }
  }

  LoginHeading = {
    "padding-bottom": "5vh",
    "padding-top": "4vh",
    "font-family": "Cairo",
    "font-weight": "bold"
  };

  loginForm = { "padding-left": "3%" };

  //get login time
  putLoginTime() {
    localStorage.setItem("logInTime", moment());
  }

  render() {
    console.log("rendering again", this.props.user1.user);
    return (
      <>
        {this.loader()}
        <form
          style={this.loginForm}
          ref={ree => {
            this.formRef = ree;
          }}
        >
          <h1 style={this.LoginHeading}>Login</h1>
          <div className="form-group">
            <label className="control-label">UserName</label>
            <input
              type="text"
              name="UserName"
              className="form-control"
              value={this.state.userName}
              onChange={e => {
                if (e.target.value === "") {
                  this.setState({ userName: null });
                } else {
                  this.setState({ userName: e.target.value });
                }
              }}
            />
            <div style={this.errs}>{this.state.userNameErr}</div>
          </div>
          <div className="form-group">
            <label className="control-label">password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={e => {
                if (e.target.value === "") {
                  this.setState({ password: null });
                } else {
                  this.setState({ password: e.target.value });
                }
              }}
            />
            <div style={this.errs}>{this.state.passwordErr}</div>
          </div>
        </form>
        {this.state.error !== null ? (
          <div className="adminLoginError">{this.state.error}</div>
        ) : (
          " "
        )}
        <button
          className="btn btn-primary signInButton "
          onClick={() => {
            this.setValues();
          }}
        >
          Sign In
        </button>
      </>
    );
  }

  componentDidUpdate() {}
}

const mapStateToProps = state => {
  return {
    user1: state.authReducer,
    InLog: state.AdminLoginRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => {
      dispatch({
        type: "login",
        payload: user
      });
    },
    updateRights: val => {
      dispatch({
        type: "updateRights",
        payload: val
      });
    },
    setAllAdminDetails: val => {
      dispatch({
        type: "AllAdminDetails",
        payload: val
      });
    },
    setTimeout: val => {
      dispatch({
        type: "setTimeout",
        payload: val
      });
    },
    logout: val => {
      dispatch({
        type: "logOut",
        payload: val
      });
    },
    setChoosenValue: nam => {
      dispatch({
        type: "toggle",
        payload: -1
      });
    },
    logoutOnAdmin: () => {
      dispatch({
        type: "logoutOnAdmin",
        payload: " "
      });
    },
    logoutForSideNav: () => {
      dispatch({
        type: "logoutForSideNav",
        payload: " "
      });
    },
    logoutForUpperMenu: () => {
      dispatch({
        type: "logoutForUpperMenu",
        payload: " "
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
