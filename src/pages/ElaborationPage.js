import React from "react";
import CommonNavBar from "../components/CommonNavBar";

import VerticalMenu from "../components/VerticalMenu";
import Details from "../components/Details";
import updateState from "../components/UpdateFunction";
import { connect } from "react-redux";

class ElaborationPage extends React.Component {
  signed = false;
  constructor(props) {
    super(props);

    this.state = {
      data1: this.props.mainData,
      instanceRecordArray: [],
      val: props.match.params.topic
    };

    this.storingState = this.storingState.bind(this);
    this.changeTheDetail = this.changeTheDetail.bind(this);

    //setting setup for incoming data
  }

  //fetch data from the server
  fetchData = async () => {
    await fetch(`https://nh65v.sse.codesandbox.io/allData`)
      .then(response => response.json())
      .then(res => {
        console.log("received");
        this.setState({
          data1: res
        });
      })
      .catch(err => {
        console.log("in error" + err);
      });
  };

  storingState(compo, inst) {
    var temp = new Array();
    if (compo === "menu") {
      console.log(compo);
      temp[0] = inst;
    } else {
      temp[1] = inst;
      console.log(compo);
    }

    this.setState({
      instanceRecordArray: temp
    });
  }

  changeTheDetail(title, value) {
    this.state.instanceRecordArray[1].setState({
      selected: value,
      selectedItem: title
    });
  }

  componentWillMount() {
    if (this.state.data1.length === 0) {
      this.fetchData();
      console.log("in component will mount");
    }
  }

  render() {
    var selectedVal = "";
    var selectedItem = "";

    window.scrollTo(0, 0);

    if (this.state.data1.length === 0) {
      return <></>;
    } else {
      this.state.data1.map((item, index) => {
        if (item.title === this.state.val) {
          selectedVal = item.value;
          selectedItem = item.title;
        }
      });

      return (
        <>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <div autoFocus />

          <div
            className="elabContainer"
            // onClick={e => {
            //   updateState("parent");
            // }}
          >
            <div className="navi_In_elab">
              <CommonNavBar signed={this.signed} />
            </div>

            <div className="vertical_menu">
              <VerticalMenu
                storingState={this.storingState}
                data={this.state.data1}
                val={this.state.val}
                changeTheDetail={this.changeTheDetail}
              />
            </div>
            {
              <div className="Elab_details">
                <Details
                  selectedVal={selectedVal}
                  selectedItem={selectedItem}
                  storingState={this.storingState}
                  allData={this.state.data1}
                />
              </div>
            }
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElaborationPage);
