import React from "react";
import $ from "jquery";
import { connect } from "react-redux";

class ImageSlideElab extends React.Component {
  //storing all image divs reference
  inputRes = [];
  all_pics = [];
  image_index = 0;

  constructor(props) {
    super(props);
    this.all_pics = this.props.picData;
    console.log("image constructor");

    this.putBorder = this.putBorder.bind(this);
    this.setRefs = this.setRefs.bind(this);
    this.testingFunc = this.testingFunc.bind(this);
  }

  scroll(direction) {
    let far = ($(".image-container").width() / 2) * direction;
    let pos = $(".image-container").scrollLeft() + far;
    $(".image-container").animate({ scrollLeft: pos }, 1000);
  }
  our;

  setRefs(arg, ind) {
    console.log("added ref" + this.inputRes.length + " index " + ind);
    this.inputRes[ind] = arg;
  }

  putBorder(currentSel) {
    this.props.clicked(currentSel, this.props.position);
  }

  componentDidMount() {
    //giving reference

    this.props.giveRef(this);
  }

  testingFunc() {
    console.log(
      "testing function called ",
      this.props.updateClick.history[this.props.position].currentSelected
    );
    try {
      this.inputRes[
        this.props.updateClick.history[this.props.position].currentSelected
      ].id = "";
    } catch (e) {}
  }

  render() {
    this.image_index = 0;
    this.inputRes = [];
    this.all_pics = this.props.picData;

    console.log("rendering image", this.all_pics);

    return (
      <>
        <div className="main">
          <div className="wrapper">
            <a className="prev" onClick={this.scroll.bind(null, -1)}>
              &#10096;
            </a>
            <div className="image-container">
              {this.props.picData.length === 0 ? (
                <div className="noImageMsg">NO RELATED IMAGES FOUND</div>
              ) : (
                this.props.picData.map((item, kk) => {
                  return (
                    <div
                      className="image"
                      onClick={() => {
                        this.props.selectImageForView(
                          this.props.position,
                          item.url,
                          item.caption
                        );
                      }}
                    >
                      <img
                        src={item.url}
                        alt=""
                        onerror="this.onerror=null;this.src='https://picsum.photos/200';"
                        className="imgStyle"
                        ref={ree => {
                          this.setRefs(ree, kk);
                        }}
                        id=""
                        onClick={() => {
                          this.putBorder(kk);
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
            <a className="next" onClick={this.scroll.bind(null, 1)}>
              &#10097;
            </a>
          </div>
        </div>
        ;
      </>
    );
  }

  componentDidUpdate() {
    console.log(
      "in update of image elab",
      this.props.position,
      this.props.updateClick.history
    );

    try {
      //info for current selected images
      var allIt = this.props.updateClick.history[this.props.position];
      console.log("read allit", allIt);

      //for the first click
      if (allIt.status === 0) {
        console.log("in image elab 000");
        this.inputRes[allIt.currentSelected].id = "imageClick_before";
        this.inputRes[allIt.previousSelected].id = "";
      }
      //if the image tab has been opened before also
      else if (allIt.status === 1) {
        console.log("in image elab 1111");
        if (allIt.currentSelected !== -1) {
          this.inputRes[allIt.currentSelected].id = "imageClick_before";
        }
      } //if the image tab is opened for the first time or we are removing the border from the image
      else if (allIt.status === -1) {
        console.log("in  image elab comp update ", allIt.currentSelected);
        this.inputRes[allIt.previousSelected].id = "";
      }
    } catch (e) {
      console.log("error in image elab", e);
    }
  }

  shouldComponentUpdate() {
    return true;
  }
}

const mapStateToProps = state => {
  return {
    updateClick: state.ImageSelection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clicked: (currentSel, index) => {
      dispatch({
        type: "setClick",
        payload: { currentSel, index }
      });
    },
    giveRef: val => {
      dispatch({
        type: "ImageSliderRefer",
        payload: val
      });
    },
    selectImageForView: (index, url, caption) => {
      dispatch({
        type: "setImageStatus",
        payload: { index, url, caption }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSlideElab);
