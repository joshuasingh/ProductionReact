import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";

class AddingImageAndCaption extends React.Component {
  //last selected values
  lastSelected = null;

  currentSelectedImage = null;

  //images ref
  imageRef = null;

  //store caption for images
  captionList = {};

  textRef = null;

  currentSelectedUrl = null;
  loaderRef = null;
  //refer the whole tab
  allRef = null;

  floatingCaptionDiv = null;

  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
    this.onImageChange = this.onImageChange.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.selectedImg = this.selectedImg.bind(this);
    this.setReference = this.setReference.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.fetchDataSingle = this.fetchDataSingle.bind(this);
    this.fetchDataMultiple = this.fetchDataMultiple.bind(this);
    this.loader = this.loader.bind(this);
  }

  componentDidUpdate() {}

  shouldComponentUpdate() {
    return true;
  }

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loaderImage" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={100} />
      </div>
    );
  };

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  selectedImg = (e, url, index) => {
    //setting the value of current selected value............
    this.currentSelectedImage = e.target;

    this.allRef.style.opacity = 0.2;

    this.floatingCaptionDiv.style.display = "inline";

    if (e.target.id === "selectImg") {
      e.target.id = "startImg";
      this.textRef.value = "";
      this.lastSelected === e.target ? this.lastSelected = null:"";
    } else {
      console.log("image selected border nnnnnnnnnnn");
      e.target.id = "selectImg";
      this.currentSelectedUrl = index;
      this.textRef.value = this.captionList[index];

      this.lastSelected !== null ? (this.lastSelected.id = "startImg") : "";

      this.lastSelected = e.target;
    }
  };

  //handling the captions
  handleCaption(e) {
    if (this.lastSelected === null) {
      alert("please select a image");
      e.target.value = "";
    } else {
      this.captionList[this.currentSelectedUrl] = e.target.value;
    }
  }

  setReference(ree) {
    console.log("setting text area refer");
    this.textRef = ree;
  }

  //upload the photos
  sendInfo() {
    //setting the values in formData to send
    var alen = this.props.selectedImages.length;
    console.log("in send Info ", this.props.selectedImages);
    const formData = new FormData();

    //showing the loader
    this.loaderRef.style.display = "inline";

    //diming the background
    this.allRef.style.opacity = 0.2;

    if (alen > 1) {
      formData.append("image", this.props.selectedData_id);
      for (let k = 0; k < alen; k++) {
        console.log("in multi upload", this.props.selectedImages[k]);
        formData.append("image", this.props.selectedImages[k]);
        formData.append("image", this.captionList[k]);
      }

      // fetchDataMultiple(formData, refer);
      this.fetchDataMultiple(formData);
    }
    if (alen === 1) {
      console.log("in single upload", this.props.selectedData_id);
      // open pop up view
      formData.append("image", this.props.selectedData_id);
      formData.append("image", this.captionList[0]);
      formData.append("image", this.props.selectedImages[0]);

      this.fetchDataSingle(formData);
    }
  }

  //fetch data from the server
  fetchDataSingle = async data1 => {
    axios
      .post(
        "https://nh65v.sse.codesandbox.io/mainImageslider/category/single",
        data1
      )
      .then(
        res => {
          if (res.data.error === "tokenPro") {
            this.loaderRef.style.display = "none";
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
            alert("you need to login first ");
          } else if (res.data.error === "InternalError") {
            this.loaderRef.style.display = "none";
            alert("Oops, there's was an error please try again");
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
          } else {
            console.log("uploading done");
            this.loaderRef.style.display = "none";

            this.props.setUserInfo(res.data.result);
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
          }
        },
        err => {
          //clasing up loading icon
          this.loaderRef.style.display = "none";
          alert("Oops, there's was an error please try again");
          this.props.AfterUpload({
            selectedData: this.props.selectedData_id
          });
          console.log("in error here" + err);
        }
      );
  };

  //fetch data from the server
  fetchDataMultiple = async data1 => {
    axios
      .post(
        "https://nh65v.sse.codesandbox.io/mainImageslider/category/multiple",
        data1
      )
      .then(
        res => {
          if (res.data.error === "tokenPro") {
            this.loaderRef.style.display = "none";
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
            alert("you need to login first ");
          } else if (res.data.error === "InternalError") {
            this.loaderRef.style.display = "none";
            alert("Oops, there's was an error please try again");
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
          } else {
            console.log("uploading done");
            this.loaderRef.style.display = "none";
            this.props.setUserInfo(res.data.result);
            this.props.AfterUpload({
              selectedData: this.props.selectedData_id
            });
          }
        },
        err => {
          //clasing up loading icon
          this.loaderRef.style.display = "none";
          alert("Oops, there's was an error please try again");
          this.props.AfterUpload({
            selectedData: this.props.selectedData_id
          });
          console.log("in error here" + err);
        }
      );
  };

  render() {
    console.log("in render of adding image", this.props.selectedData_id);
    var tempObjUrl = [];

    for (let k = 0; k < this.props.selectedImages.length; k++) {
      console.log("in multi upload", this.props.selectedImages[k]);
      tempObjUrl.push(this.props.selectedImages[k]);
    }
    return (
      <>
        {this.loader()}
        <div
          className="floatingCaption"
          ref={ree => {
            this.floatingCaptionDiv = ree;
          }}
        >
          <textarea
            rows="4"
            cols="60"
            ref={ree => this.setReference(ree)}
            className="EditValue1"
            onChange={e => this.handleCaption(e)}
          />

          <button
            className="btn btn-primary viewAdminBack   saveCaption"
            onClick={() => {
              this.floatingCaptionDiv.style.display = "none";
              this.currentSelectedImage.id = "startImg";
              this.lastSelected = null;
              this.allRef.style.opacity = 1;
            }}
          >
            Save
          </button>
        </div>
        <div className="allRefering" ref={ree => (this.allRef = ree)}>
          <h1 className="galleryHeader">Selected Images</h1>
          <div
            className="galleria"
            ref={ree => {
              console.log("reefrerrebece set");
              this.imageRef = ree;
            }}
          >
            {tempObjUrl.map((item, key) => {
              this.captionList[key] = "";
              return (
                <img
                  className="imageClass"
                  src={URL.createObjectURL(item)}
                  alt=""
                  id="startImg"
                  onClick={e => this.selectedImg(e, item, key)}
                />

                // </a>
              );
            })}
          </div>

          <button
            className="btn btn-primary viewAdminBack  submitCaption"
            type="button"
            onClick={() => this.sendInfo()}
          >
            Submit
          </button>
          <button
            className="btn btn-primary viewAdminBack  backCaption"
            type="button"
            onClick={() => {
              this.props.gettingBackNoUpdate();
            }}
          >
            back
          </button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "update",
        payload: name
      });
    },
    backPressFromImg: name => {
      dispatch({
        type: "getBackToEditMenu",
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
    gettingBackNoUpdate: value => {
      dispatch({
        type: "getBackToEditMenuNotUpdate",
        payload: value
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddingImageAndCaption);
