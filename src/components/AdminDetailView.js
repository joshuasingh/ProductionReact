import React from "react";
import ManipulateMenuData from "../components/AdminComponents/ManipulateMenuData";
import MainImageSlider from "../components/AdminComponents/AdminImagestab/MainImageSlider";
import ImageCategoryWise from "../components/AdminComponents/AdminImageCategoryWise/ImageCategoryWise";
import { connect } from "react-redux";
import SettingOptions from "./AdminComponents/CreateAdmin/SettingOptions";

class AdminDetailView extends React.Component {
  data = ["first", "second", "third", "fourth", "fifth"];

  //back button reference
  backButtonRef = null;

  //child component reference
  childRef = null;

  //main page slider info
  mainPageSliderInfo = {};

  constructor(props) {
    super(props);

    this.state = {
      ind: this.props.selectedInstant
    };

    this.setBackButtonStatus = this.setBackButtonStatus.bind(this);
    this.changeBackToStart = this.changeBackToStart.bind(this);
    this.setStatusBack = this.setStatusBack.bind(this);
    this.gettingChildRef = this.gettingChildRef.bind(this);
    this.getSliderInfo = this.getSliderInfo.bind(this);
  }

  componentWillMount() {
    this.props.getStatus(this);

    //setting up status for redux store
    //this.props.initialize(this.props.data);
    console.log("will mount of details called");
  }

  //get back to initial state
  changeBackToStart() {
    console.log("change initiated");
  }

  //handling back button
  setBackButtonStatus() {
    this.backButtonRef.style.display = "inline";
  }

  //setting child reference
  gettingChildRef(thiss) {
    this.childRef = thiss;
  }

  //get back to main states
  setStatusBack() {
    this.backButtonRef.style.display = "none";
    this.childRef.setState({
      updated: 0,
      calledState: 0,
      EditStateVal: null,
      AddMenu: 0,
      showAll: 1
    });
  }

  //getting mainplage slider info
  getSliderInfo() {
    try {
      this.props.data.map((item, index) => {
        return item.title === "mainPageSlider"
          ? (this.mainPageSliderInfo = item)
          : " ";
      });
    } catch (e) {}
  }

  render() {
    this.getSliderInfo();

    console.log(
      "admin details called",
      this.props.selectedState.index,
      "-----",
      this.props.user1.mainData
    );

    return (
      <>
        <div
          className="getBack"
          ref={ree => {
            console.log("back button reference set");
            this.backButtonRef = ree;
          }}
        />
        <div className="allDetailDiv">
          {this.props.selectedState.index === -1 ? "nothing is selected" : " "}

          {this.props.selectedState.index === 0 ? (
            <MainImageSlider data={this.props.user1.mainData} />
          ) : (
            " "
          )}

          {this.props.selectedState.index=== 1 ? (
            <ManipulateMenuData
              data={this.props.user1.mainData}
              fetchData={this.props.fetchData}
              setBackButtonStatus={this.setBackButtonStatus}
              gettingChildRef={this.gettingChildRef}
            />
          ) : (
            " "
          )}

          {this.props.selectedState.index === 2 ? (
            <ImageCategoryWise data={this.props.user1.mainData} />
          ) : (
            " "
          )}
          {this.props.selectedState.index === 3 ? (
            <SettingOptions data={this.props.user1.mainData} />
          ) : (
            " "
          )}
        </div>
      </>
    );
  }

  componentDidUpdate() {
    console.log("update from details called");
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView,
    selectedState:state.adminDetailViewRed
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDetailView);
