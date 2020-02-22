import React from "react";
import { EventEmitter } from "events";

const sharedFunction = {
  Test(arg, thiss) {
    thiss.setState({
      selected: arg
    });
  }
};

export default sharedFunction;
