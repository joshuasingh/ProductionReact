import React from "react";
import { allMenuData } from "../AdminImageCategoryWise/allMenuData";
import { editImagesMenu } from "../AdminImageCategoryWise/EditImagesMenu";
import AddingImageAndCaption from "../AdminImageCategoryWise/AddingImageAndCaption";
import { connect } from "react-redux";

class ImageCategoryWise extends React.Component {
  popRef = null;

  constructor(props) {
    super(props);

    this.getPopPermission = this.getPopPermission.bind(this);
    this.setPopUpRef = this.setPopUpRef.bind(this);
    this.getBackToMain = this.getBackToMain.bind(this);
    this.backPresses = this.backPresses.bind(this);
  }

  setPopUpRef(ree) {
    console.log("getting popup ref");
    this.popRef = ree;
  }

  //when submit buttonis clicked on upload screen
  getBackToMain(updatedVal) {
    this.setState({
      selectedData: updatedVal[0]._id,
      showImgMenu: 1,
      showAll: 0,
      showAddingImage: 0
    });
  }

  //when back button is pressed on uploading images screen
  backPresses() {
    //this.props.getToShowAll();

    this.setState({
      showImgMenu: 1,
      showAll: 0,
      showAddingImage: 0
    });
  }

  getPopPermission() {
    this.popRef.style.display = "block";
  }

  //close popUp View
  closeForm(caption) {
    this.popRef.style.display = "none";
  }

  componentDidUpdate() {
    console.log(
      "update from details called",
      this.props.fromAddingImage.showImgMenu
    );
  }

  componentWillMount() {
    this.props.initialize({
      allData: this.props.user1.mainData
    });
  }

  render() {
    console.log(
      "in image Category wise",
      this.props.fromAddingImage.showImgMenu,
      "----- ",
      this.props.user1.mainData
    );
    return (
      <>
        {this.props.fromAddingImage.showAll === 1
          ? allMenuData(this.props.user1.mainData, this)
          : " "}
        {this.props.fromAddingImage.showImgMenu === 1
          ? editImagesMenu(this)
          : " "}
        {this.props.fromAddingImage.showAddingImage === 1 ? (
          <AddingImageAndCaption
            selectedImages={this.props.fromAddingImage.selectedFile}
            selectedData_id={this.props.fromAddingImage.selectedData}
          />
        ) : (
          " "
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView,
    fromAddingImage: state.addingImageRed
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
        type: "initializeIt",
        payload: name
      });
    },
    AfterUpload: value => {
      dispatch({
        type: "getBackToEditMenu",
        payload: value
      });
    },
    getToShowAll: value => {
      dispatch({
        type: "getBackToShowAll",
        payload: value
      });
    },
    getToEditMenu: value => {
      dispatch({
        type: "goToEditMenu",
        payload: value
      });
    },
    addingImagesScreen: value => {
      dispatch({
        type: "addingImagesScreen",
        payload: value
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageCategoryWise);
