import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.num = this.props.num;
    this.val = this.props.val;
  }

  render() {
    let art = "/details/".concat(`${this.val.title}`);

    return (
      <>
        <div
          className={`menuItems${this.num}`}
          id="genericMenuItems"
          ref={ree => this.props.setmenuRef(this.num, ree)}
        >
          <Link className="article-list-item" to={art}>
            {console.log(this.num)}
            <h3>{this.val.title}</h3>
            <p> {this.val.value} </p>
          </Link>
        </div>
      </>
    );
  }

  componentDidUpdate() {
    console.log("heading done");
  }
}

export default Heading;
