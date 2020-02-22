import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";

var validator = require("validator");

class CreateAdmin extends React.Component {
  pass = null;
  confPass = null;
  formRef = null;
  backButton = null;
  createButton = null;

  constructor(props) {
    super(props);

    this.state = {
      UserName: "",
      UserNameErr: "",
      Email: "",
      EmailErr: "",
      Password: "",
      PasswordErr: "",
      cnfPassword: " "
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  comparePassword(a) {
    if (this.pass === a.target.value) alert("its same");

    console.log(a.target.name);
  }

  handleChange(a) {
    var naming = a.target.name;

    this.setState({
      [naming]: a.target.value
    });

    console.log(this.state);
  }

  validateForm() {
    //showing the loader
    this.loaderRef.style.display = "inline";
    //diming the background
    this.formRef.style.opacity = 0.2;
    let error = {};
    this.setState({
      UserNameErr: "",
      PasswordErr: "",
      EmailErr: " "
    });
    console.log(this.state);
    if (validator.isEmpty(this.state.UserName)) {
      console.log("username empty", this.state.Password);
      error = { ...error, UserNameErr: "field cannot be empty" };
    }
    if (validator.isEmpty(this.state.Password)) {
      console.log("password empty");
      error = { ...error, PasswordErr: "password cannot be empty" };
    }
    if (this.state.Email === "") {
      console.log("email empty");
      error = { ...error, EmailErr: "email cannot be empty" };
    }
    if (!validator.isEmail(this.state.Email)) {
      error = { EmailErr: "please input a right email ", ...error };
    }
    if (!validator.equals(this.state.Password, this.state.cnfPassword)) {
      error = { ...error, PasswordErr: "password do not match " };
    }
    if (this.state.Password.length <= 8) {
      error = {
        ...error,
        PasswordErr: "the length of password should be more than 8"
      };
    }
    if (Object.keys(error).length !== 0) {
      console.log("in here");

      this.loaderRef.style.display = "none";
      //diming the background
      this.formRef.style.opacity = 1;
      this.setState({ ...error });
    } //send request to server to create a account
    else {
      //disable back and create button
      this.createButton.disabled = true;
      this.backButton.disabled = true;

      const data1 = {
        UserName: this.state.UserName,
        Email: this.state.Email,
        Password: this.state.Password
      };
      axios
        .post("https://nh65v.sse.codesandbox.io/adminSetting/AddUser", data1)
        .then(
          res => {
            if (res.data.error === "tokenPro") {
              //Enable back and create button
              this.createButton.disabled = false;
              this.backButton.disabled = false;

              //Undiming the background
              this.formRef.style.opacity = 1;
              this.loaderRef.style.display = "none";
              alert("you need to login first ");
            } else if (res.data.error === "InternalError") {
              //Enable back and create button
              this.createButton.disabled = false;
              this.backButton.disabled = false;

              //Undiming the background
              this.formRef.style.opacity = 1;
              this.loaderRef.style.display = "none";
              alert("Oops, there's was an error please try again");
            } else if (res.data.error === "emailNotUnique") {
              alert("email Id already exist,please enter a new Email Id");

              //Enable back and create button
              this.createButton.disabled = false;
              this.backButton.disabled = false;

              //Undiming the background
              this.formRef.style.opacity = 1;
              this.loaderRef.style.display = "none";
            } else {
              alert("Admin Created");
              this.props.selection(-1);
              console.log("uploading done", res.data.result);

            //update admin list
             this.props.updateAdmin(res.data.result)

              //Enable back and create button
              this.createButton.disabled = false;
              this.backButton.disabled = false;

              //Undiming the background
              this.formRef.style.opacity = 1;
              this.loaderRef.style.display = "none";
     

            }
          },
          err => {
            //clasing up loading icon
            // this.loaderRef.style.display = "none";
            alert("Oops, there's was an error please try again");

            //Enable back and create button
            this.createButton.disabled = false;
            this.backButton.disabled = false;

            //Undiming the background
            this.formRef.style.opacity = 1;
            this.loaderRef.style.display = "none";
            console.log("in error here" + err);
          }
        );
    }
  }

  loaderStyle = {
    "margin-left": "6%"
  };

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div
        className="loaderImage"
        ref={ree => (this.loaderRef = ree)}
        style={this.loaderStyle}
      >
        <Rolling size={100} />
      </div>
    );
  };

  heading = {
    "margin-bottom": "2vh"
  };

  render() {
    return (
      <>
        {this.loader()}
        <form
          className="createAdminCss"
          ref={ree => {
            this.formRef = ree;
          }}
        >
          <h1 style={this.heading}>Customize As Wished</h1>
          <div className="form-group">
            <label className="control-label">UserName</label>
            <input
              type="text"
              name="UserName"
              className="form-control createAdminInput"
              value={this.state.username}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            {this.state.UserNameErr !== "" ? (
              <div className="errs">{this.state.UserNameErr}</div>
            ) : (
              <div className="errs" />
            )}
          </div>
          <div className="form-group">
            <label className="control-label">e-mail</label>
            <input
              type="text"
              name="Email"
              className="form-control createAdminInput"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className="errs">
              {this.state.EmailErr !== "" ? this.state.EmailErr : "  "}
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">password</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className="errs">
              {this.state.PasswordErr !== "" ? this.state.PasswordErr : "  "}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label">Confirm password</label>
            <input
              type="password"
              name="cnfPassword"
              className="form-control"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <div className="errs">
              {this.state.PasswordErr !== "" ? this.state.PasswordErr : "  "}
            </div>
          </div>
        </form>
        <button
          className="btn btn-primary createAdminBackBtn"
          onClick={() => {
            this.props.selection(-1);
          }}
          ref={ree => {
            this.backButton = ree;
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary createAdminBtn"
          onClick={() => {
            this.validateForm();
          }}
          ref={ree => {
            this.createButton = ree;
          }}
        >
          Create An Account
        </button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView,
    
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
    },
    updateAdmin: val => {
      dispatch({
        type: "updateAdminList",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAdmin);
