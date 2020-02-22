import React from "react";
import { connect } from "react-redux";
import moment from "moment";

class AdminUpperMenuTab extends React.Component {
  //storing all menu item reference
  inputRefs = [];
  inputRefsTab = [];
  index = 0;

  //store the selection sequence

  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
    this.updateUpperTabstyle = this.updateUpperTabstyle.bind(this);
  }

  //setting refs for all the tabs
  setRefs(ree, key) {
    this.inputRefs[key] = ree;
  }

  //handling the click of tab
  removeTab(num) {
    let lastCLicked = null;

    let lastOne = null;
    let oldArray = this.props.tabList;
    let temp = [];
    let j = 0;
    for (let i = 0; i < oldArray.length; i++) {
      if (i !== num) {
        temp[j] = oldArray[i];

        j += 1;
      }
      if (i === num - 1) {
        lastOne = oldArray[i];
        lastCLicked = i;
      }
    }

    //if removed one is first element
    if (num === 0) {
      lastCLicked = -1;
    }

    console.log("removing tab", this.props.tabList[num], lastCLicked);

    //setting the css on tab heads on removal if removing the tab that is selected
    if (num === this.props.user1.selected) {
      this.props.closeTabSelectedOne(lastCLicked, oldArray);

      //handle side nav and all detail view
      this.props.removeHeader(temp, this.props.tabList[num], lastOne, true);
    } else {
      this.props.closeTabUnselectedOne(num, oldArray);

      //handle side nav and all detail view
      this.props.removeHeader(temp, this.props.tabList[num], lastOne, false);
    }

    //setting state of choosen when the "setting tab is removed"
    if (this.props.tabList[num] === "settings") {
      this.props.setChoosenValue(-1);
    }

    //detaching all values from details if nothing is selected
    if (this.props.tabList.length === 1) {
      this.props.goBackToInitial();
    }
  }

  //setting color of the tab
  setColor(key) {
    this.props.switchTab(key);
  }

  changeTab(val) {
    this.props.setDetail(val);
  }

  componentWillMount() {
    if (this.props.tabList.length === 0) {
    }
  }

  setTabsRef(tabRefer, place) {
    console.log("in set tab ref", place);
    this.inputRefsTab[place] = tabRefer;
  }

  render() {
    console.log(
      "upper menu tab rendered again ",
      this.props.user1.previous,
      this.props.user1.selected
    );

    return (
      <>
        <div className="AdminUpperMenuTab">
          <nav>
            {this.props.tabList.map((item, key) => {
              return (
                <div
                  className="menuTabs"
                  id="menuTabsId"
                  ref={ree => {
                    this.setTabsRef(ree, key);
                  }}
                >
                  <p
                    className="menuTabText"
                    id={key}
                    onClick={() => {
                      this.setColor(key);
                      this.changeTab(item);
                    }}
                  >
                    {item}
                  </p>

                  <div
                    className="crossSign"
                    ref={ree => {
                      this.setRefs(ree, key);
                    }}
                    onClick={() => {
                      this.removeTab(key);
                    }}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </>
    );
  }

  //update upper menu tab style .......paint GREY
  updateUpperTabstyle() {
    console.log(
      "in update of admin upper menu tab",
      this.props.user1.previous,
      "....",
      this.props.user1.selected
    );

    try {
      //change the style of selected tab
      if (this.props.user1.previous !== this.props.user1.selected) {
        this.inputRefsTab[this.props.user1.selected].id = "menuTabsIdClicked";
        this.inputRefsTab[this.props.user1.previous].id = "menuTabsId";
      }
    } catch (e) {
      //nothing to do
      console.log("error caught");
    }
  }

  componentDidMount() {
    this.updateUpperTabstyle();
  }

  componentDidUpdate() {
    this.updateUpperTabstyle();
  }
}

const mapStateToProps = state => {
  return {
    user1: state.adminUpperMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChoosenValue: nam => {
      dispatch({
        type: "toggle",
        payload: -1
      });
    },
    switchTab: value => {
      dispatch({
        type: "switchTab",
        payload: value
      });
    },
    closeTabSelectedOne: (current, array1) => {
      dispatch({
        type: "closeTabSelectedOne",
        payload: { current, array1 }
      });
    },
    closeTabUnselectedOne: (current, array1) => {
      dispatch({
        type: "closeTabUnselectedOne",
        payload: { current, array1 }
      });
    },
    logout: val => {
      dispatch({
        type: "logOut",
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
)(AdminUpperMenuTab);
