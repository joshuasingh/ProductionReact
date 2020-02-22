import React from "react";
import { useState, useEffect } from "react";
import Heading from "../components/Heading";
import ExpandedView from "../components/ExpandedView";
import { thisTypeAnnotation } from "@babel/types";
import Slideshow from "../components/Carou";
import { Link } from "react-router-dom";

class menu extends React.Component {
  //this array is used to store only the needed info for vertical menu
  finalArray = [];

  constructor(props) {
    super(props);

    //storing ref of menu item
    this.referring = [];

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    console.log("attr set");
    this.setState({
      count: 0
    });
  }

  render() {
    const dt = this.props.data;
    console.log("thie  mainpage ", dt);

    //populating only relevent data in array
    if (this.finalArray.length === 0) {
      dt.map((item, index) => {
        if (item.title !== "mainPageSlider" && item.title !== "NavBarDetials") {
          this.finalArray[index] = item;
        }
      });
    }

    return (
      <>
        <div className="row ">
          {this.finalArray.map((item, key) => {
            console.log("getting url info", item);
            let art = "/details/".concat(`${item.title}`);
            return (
              // <a href="https://picsum.photos/200/200" key={key}>

              <div className="col-md-4 mb-5">
                <Link to={art}>
                  <div className="card h-100 cardhome">
                    <div className="card-body">
                      <p className="card-text">{item.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  componentDidUpdate() {
    this.itemnum = this.props.data.length;
  }
}

export default menu;
