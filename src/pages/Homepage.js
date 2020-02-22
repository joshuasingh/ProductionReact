import React from "react";
import { useState, useEffect } from "react";
import Heading from "../components/Heading";
import ExpandedView from "../components/ExpandedView";
import { Redirect } from "react-router";
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";
import NavBar1 from "../components/NavBar1";
import ImageSliderComp from "../components/ImageSliderComp";
import { connect } from "react-redux";
import CommonNavBar from "../components/CommonNavBar";

const handleEvent = () => {
  return <Redirect to="/Expand" />;
};

class Homepage extends React.Component {
  signed = false;
  constructor(props) {
    super(props);

    this.state = {
      data1: this.props.mainData
    };
  }

  componentDidMount() {}

  render() {
    console.log("in render of homepage", this.state.data1);
    if (this.state.data1.length === 0) {
      return <></>;
    } else {
      this.state.data1.map((item, index) => {
        if (item.title === "NavBarDetials") {
          this.props.InitiateNavBar(item.links);
        }
      });

      return (
        <>
          <div className="Mcontainer">
            <div className="imageSlide">
              <ImageSliderComp picData={this.state.data1} />
            </div>
            <div className="navi">
              <CommonNavBar signed={this.signed} />
            </div>
            <div className="menu">
              <Menu data={this.state.data1} />
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
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
)(Homepage);
