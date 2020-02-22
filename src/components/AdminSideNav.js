import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

class AdminSideNav extends React.Component {
  //storing all menu item reference
  inputRefs = [];
  index = 0;
  LoginTime = null;

  constructor(props) {
    super(props);

    console.log("%c admin side nav const", "color:blue;");
    this.state = {
      menu_items: this.props.Menu_items,
      currentSelected: this.props.current,
      previousSelected: this.props.previous,
      first: 1
    };

    this.sideViewTab = this.sideViewTab.bind(this);
    this.updateBackground = this.updateBackground.bind(this);
  }

  setRefs(arg) {
    this.inputRefs.push(arg);
  }

  putColor(index) {
    this.inputRefs[index].id = "rowTest_afterClick-admin";

    //change in side nav
    this.props.switchSideTab(index);

    //for the first click....when nothing is clicked
    // if (this.state.first === 1) {
    //   this.setState(prevState => ({
    //     currentSelected: index,
    //     previousSelected: index,
    //     first: 0
    //   }));
    // } else {
    //   this.setState(prevState => ({
    //     currentSelected: index,
    //     previousSelected: prevState.currentSelected
    //   }));
    // }
  }

  addHeaderFortabs(index) {
    console.log("tabs called");
    this.props.addHeader(index);
  }

  //give the current selected and prev selected to admin component
  getSelectionValue() {
    // return [this.state.currentSelected, this.state.previousSelected];

    return [
      this.props.user1.currentSelected,
      this.props.user1.previousSelected
    ];
  }

  componentWillMount() {
    //give the side nav reference to admin page to control it
    this.props.getStatusFromSN(this);

    //setting side tab background on first load

    console.log("side nav will mount called");
  }

  componentDidMount() {
    this.updateBackground();
  }

  //item menu layout
  sideViewTab(val) {
    return (
      <>
        <h5 className="sideBarText-admin">{val}</h5>
      </>
    );
  }

  render() {
    console.log("calling render in admin side nav");
    return (
      <>
        <div className="container-fluid-admin">
          {this.state.menu_items.map((item, index) => {
            return (
              <div
                className="row-admin"
                id="rowTest_beforeClick-admin"
                ref={ree => this.setRefs(ree)}
                onClick={e => {
                  // this.props.changeTheDetail(index);
                  this.putColor(index);
                  this.addHeaderFortabs(index);
                }}
              >
                <div className="row-sm-4">{this.sideViewTab(item)}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  updateBackground() {
    console.log(
      "in updateBaccccckground",
      this.props.user1.currentSelected,
      this.props.user1.previousSelected
    );
    try {
      if (this.props.user1.currentSelected !== -1) {
        //setting for the clicked object ID
        this.inputRefs[this.props.user1.currentSelected].id =
          "rowTest_afterClick-admin";

        if (
          this.props.user1.previousSelected !== this.props.user1.currentSelected
        ) {
          console.log(
            "checking errrrrrrrrror in side nav",
            this.props.user1.previousSelected,
            this.props.user1.currentSelected
          );
          //removing the clicked css from deselected option
          this.inputRefs[this.props.user1.previousSelected].id =
            "rowTest_beforeClick-admin";
        }
      } else {
        //for when all the tab are closed
        if (this.props.user1.previousSelected !== -1) {
          //removing the clicked css from deselected option
          this.inputRefs[this.props.user1.previousSelected].id =
            "rowTest_beforeClick-admin";
        }
      }
    } catch (e) {}
  }

  componentDidUpdate() {
    this.updateBackground();
  }
}

const mapStateToProps = state => {
  return {
    //user1: state.adminUpperMen
    user1: state.adminSideNavRed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchTab: value => {
      dispatch({
        type: "switchTab",
        payload: value
      });
    },
    switchSideTab: value => {
      dispatch({
        type: "switchSideTab",
        payload: value
      });
    },
    setTimeout: val => {
      dispatch({
        type: "setTimeout",
        payload: val
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
)(AdminSideNav);
