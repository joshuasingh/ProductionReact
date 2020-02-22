import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

class VerticalMenu extends React.Component {
  //storing all menu item reference
  inputRefs = [];
  index = 0;

  //this array is used to store only the needed info for vertical menu
  finalArray = [];

  testData = [
    { value: "joshua" },
    { value: "joshua1" },
    { value: "joshua2" },
    { value: "joshua3" },
    { value: "joshua4" }
  ];

  constructor(props) {
    super(props);

    const data = this.props.data;
    const val = this.props.val;

    console.log("in constr props data", this.props.data);
    this.findTheSelectedVal();

    this.state = {
      data: this.props.data,
      currentSelected: this.index,
      previousSelected: -1,
      first: 0
    };

    console.log("in recycler menu ", this.props.data);

    this.newOne = React.createRef();
    this.putColor = this.putColor.bind(this);
    this.render = this.render.bind(this);
    this.removeBorder = this.removeBorder.bind(this);

    this.props.storingState("menu", this);
  }

  //find the index of selected index
  findTheSelectedVal() {
    this.props.data.map((item, inde) => {
      if (item.title === this.props.val) {
        this.index = inde;
      }
    });
  }

  putColor(valling) {
    console.log("valling" + valling);
    console.log(
      "in putcolor" + this.state.currentSelected + this.state.previousSelected
    );
    this.inputRefs[valling].id = "rowTest_afterClick";

    //re-initializing the image info tab
    this.props.clicked(this.state.currentSelected);

    this.setState(prevState => ({
      previousSelected: prevState.currentSelected,
      currentSelected: valling
    }));

    this.props.callTest();
  }

  //Called to remove the border from the changing tab
  removeBorder() {}

  setRefs(arg) {
    this.inputRefs.push(arg);
  }

  componentDidMount() {
    console.log(
      "in component did mount of vertical menu",
      this.state.data.length
    );

    //initializing for the images tab work
    this.props.initialize(this.state.data.length);

    console.log(
      "expand image called from vertical meni ",
      this.state.data.length - 2
    );

    //initialize the expanded image view
    this.props.initializeExpandImage(this.state.data.length - 2);

    this.inputRefs[this.state.currentSelected].id = "rowTest_afterClick";

    this.inputRefs[this.state.currentSelected].scrollIntoView();

    this.setState({
      data: this.props.data
    });
  }

  //Inline style for side tab

  testing1 = { overflow: "auto" };

  testing2 = {
    "margin-top": "4%",
    "border-radius": "25px",
    height: "12vh",
    "background-Color": "#5CDB95",
    "box-shadow": "2px 2px #7fdbff"
  };

  //////////////////////

  //item menu layout
  sideViewTab(val) {
    return (
      <>
        <h5 className="sideBarText">{val}</h5>
      </>
    );
  }

  render() {
    console.log(
      "vertical menu render called",
      this.props.data,
      this.state.currentSelected
    );
    const values = this.state.data;

    //populating only relevent data in array
    if (this.finalArray.length === 0) {
      values.map((item, index) => {
        if (item.title !== "mainPageSlider" && item.title !== "NavBarDetials") {
          this.finalArray[index] = item;
        }
      });
    }

    return (
      <>
        <div
          className="container-fluid"
          id="gridViewforAdmin"
          style={this.testing1}
        >
          {this.finalArray.map((item, index) => {
            return (
              <div
                className="row"
                id="rowTest_beforeClick"
                ref={ree => this.setRefs(ree)}
                onClick={e => {
                  if (this.state.currentSelected !== index) {
                    this.props.changeTheDetail(item.title, item.value);
                    this.putColor(index);
                  }
                }}
              >
                <div className="row-sm-4">{this.sideViewTab(item.title)}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  componentDidUpdate() {
    //remove color from previous state
    if (this.state.previousSelected !== -1)
      this.inputRefs[this.state.previousSelected].id = "rowTest_beforeClick";
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    clicked: index => {
      dispatch({
        type: "toggleImageWindow",
        payload: index
      });
    },
    initialize: count => {
      dispatch({
        type: "initiateAllTabs",
        payload: count
      });
    },
    callTest: () => {
      dispatch({
        type: "callTest",
        payload: ""
      });
    },
    initializeExpandImage: count => {
      dispatch({
        type: "ExpandedImageInitiate",
        payload: count
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerticalMenu);
