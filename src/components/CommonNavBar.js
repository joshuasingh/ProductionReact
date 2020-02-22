import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CommonNavBar extends React.Component {
  //array to store key and values for the navbar
  navbarTitles = [];
  navbarLinks = [];
  user = {};

  signOut() {
    this.props.logOutUser();
    this.props.setChoosenValue();

    this.props.logoutOnAdmin();

    this.props.logoutForSideNav();

    this.props.logoutForUpperMenu();

    //remove event listener
  }

  componentDidMount() {}

  divstyle = {
    "padding-top": "2vh",
    "padding-bottom": "2vh"
  };

  render() {
    this.user = this.props.userInfo.user;

    console.log(
      "in vavbarbasbdasdb",
      this.props.getNavData.NavbarDets,
      this.props.userInfo.user.username
    );

    if (this.props.getNavData.NavbarDets !== null) {
      this.temp = this.props.getNavData.NavbarDets;

      this.navbarTitles = [...Object.keys(this.temp)];
      this.navbarLinks = [...Object.values(this.temp)];
    }

    return (
      <>
        <div style={this.divstyle}>
          {this.props.signed ? (
            <h4 className="navBarName">
              Hi..{this.props.userInfo.user.username}
            </h4>
          ) : (
            " "
          )}
          {this.navbarTitles.map((item, index) => {
            return (
              <Link className="navBarLinks" to={this.navbarLinks[index]}>
                {item}
              </Link>
            );
          })}
          {this.props.signed ? (
            <Link
              className="navBarLinks"
              onClick={() => {
                this.signOut();
              }}
            >
              Sign Out
            </Link>
          ) : (
            " "
          )}
        </div>
      </>
    );
  }

  componentDidUpdate() {}
}

const mapStateToProps = state => {
  return {
    getNavData: state.NavbarReduce,
    userInfo: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: name => {
      dispatch({
        type: "logOut",
        payload: ""
      });
    },
    setChoosenValue: nam => {
      dispatch({
        type: "toggle",
        payload: -1
      });
    },
    logoutForUpperMenu: () => {
      dispatch({
        type: "logoutForUpperMenu",
        payload: " "
      });
    },
    logoutForSideNav: () => {
      dispatch({
        type: "logoutForSideNav",
        payload: " "
      });
    },
    logoutOnAdmin: () => {
      dispatch({
        type: "logoutOnAdmin",
        payload: " "
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonNavBar);
