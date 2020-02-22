import React from "react";
import { useState, useEffect } from "react";
import ImageSlideElab from "../components/ImageSlideElab";
import { connect } from "react-redux";

class Details extends React.Component {
  position;

  //capiotn of the selected image

  CaptionRef = null;

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedVal,
      selectedItem: this.props.selectedItem,
      itemStatus: this.fillArray(),
      picCaption: null
    };

    this.props.storingState("notMenu", this);
    this.setImage = this.setImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.detailElab = this.detailElab.bind(this);

    const selectedVal = this.state.selected;
    const selectedItem = this.state.selectedItem;
  }

  fillArray() {
    var arr = Array.apply(null, Array(this.props.allData.length));
    return arr.map(function(x, i) {
      return 0;
    });
  }

  data = this.props.allData;

  setImage(imgUrl, ind) {
    console.log(
      "in set image",
      imgUrl,
      "clicked index",
      ind,
      "and this position",
      this.position,
      "item status",
      this.state.itemStatus
    );

    //keeping a temporary array
    var temp = this.state.itemStatus;
    temp[this.position] = 1;

    //changing the status of clicked event
    this.setState({
      itemStatus: temp,
      picCaption: imgUrl.caption
    });
    var re = this.imageRef;

    re.id = "EnlargeImageShow";
    //re.style.transition = "all 2s";
    this.textRef.id = "Text_Details_Transform-after";

    // this.textRef.style.transition = "all 2s";
    this.showingImg.style.backgroundImage = "url(" + imgUrl.url + ")";

    //setting the caption
    this.CaptionRef.value = "sdfsdfsdf";
  }

  closeImage() {
    //keeping a temporary array
    var temp = this.state.itemStatus;

    var re = this.imageRef;
    re.id = "EnlargeImage";
    // re.style.transition = "all 2s";
    this.textRef.id = "Text_Details_Transform_before";

    //remove border from the selected image
    this.props.clicked(this.position);

    this.props.clickToReset(this.position);
  }

  changePicture() {
    this.imageRef.style.backgroundImage = 'url("https://picsum.photos/200")';
  }

  picObject = [];
  componentDidMount() {
    console.log("in component did mount of details");
  }

  //all details about clicked point
  detailElab(val) {
    return (
      <>
        <div
          className="Text_Details"
          id="Text_Details_Transform_before"
          ref={e => {
            this.textRef = e;
          }}
        >
          <div className="elabHeading">{val.title}</div>
          <div className="elabText">{val.value}</div>
        </div>
      </>
    );
  }

  render() {
    //getting the position of selected item from vertical menu
    this.data.map((item, index) => {
      if (item.title === this.state.selectedItem) {
        this.picObject = item.pics;
        this.position = index;
      }
    });

    console.log(
      "giving item Status in details position",
      this.props.imagesTabStatus.allTabRef
    );
    return (
      <>
        <div className="Alldetails">
          {this.detailElab(this.data[this.position])}
          <div
            className="EnlargedImageClass"
            id="EnlargeImage"
            ref={e => {
              this.imageRef = e;
            }}
          >
            <div
              className="closing_icon"
              onClick={() => {
                this.closeImage();
              }}
              title="close"
            >
              ---
            </div>

            <div
              className="ImageHere"
              ref={e => {
                this.showingImg = e;
              }}
            />
            <div
              id="caption"
              ref={ree => {
                this.CaptionRef = ree;
              }}
              value="sdfsdfdsf"
            >
              {this.props.imagesTabStatus.allTabRef !== null
                ? this.props.imagesTabStatus.allTabRef[this.position]
                    .currentCaption
                : ""}
            </div>
          </div>

          <div className="Image_Info">
            <ImageSlideElab
              setImage={this.setImage}
              changePicture={this.changePicture}
              picData={this.picObject}
              position={this.position}
            />
          </div>
        </div>
      </>
    );
  }

  //check if the expanded view for images is open or not
  checkStatus() {
    var itemDetails = this.props.imagesTabStatus.allTabRef[this.position];
    if (itemDetails.status !== -1) {
      var re = this.imageRef;
      re.id = "EnlargeImageShow";
      //re.style.transition = "all 2s";
      this.textRef.id = "Text_Details_Transform-after";

      //set the background image
      this.showingImg.style.backgroundImage =
        "url(" + itemDetails.currentUrl + ")";
    } else {
      var re = this.imageRef;
      re.id = "EnlargeImage";
      // re.style.transition = "all 2s";
      this.textRef.id = "Text_Details_Transform_before";
    }
  }

  componentDidUpdate() {
    console.log(
      "in component did update in image elab ",
      this.props.imagesTabStatus.allTabRef[this.position]
    );
    this.checkStatus();
  }
}

const mapStateToProps = state => {
  return {
    updateClick: state.ImageSelection,
    imagesTabStatus: state.ShowExpandedImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clicked: val => {
      dispatch({
        type: "setReset",
        payload: val
      });
    },
    clickToReset: index => {
      dispatch({
        type: "resetEnlargedImage",
        payload: { index }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
