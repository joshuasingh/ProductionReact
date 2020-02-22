import React from "react";
import $ from "jquery";
import { Carousel } from "react-responsive-carousel";

class ImageSliderComp extends React.Component {
  //storing all image divs reference
  inputRes = [];
  all_pics = [];
  image_index = 0;

  constructor(props) {
    super(props);
    this.all_pics = this.props.picData;
    console.log("image constructor");
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

  render() {
    this.image_index = 0;
    this.inputRes = [];
    this.all_pics = this.props.picData;

    //main image slider urls
    var selected = { pics: [] };
    this.all_pics.map(item => {
      if (item.title === "mainPageSlider") {
        selected = item;
      }
    });
    console.log("rendering image", selected);

    return (
      <>
        <Carousel
          className="mainImageSlider"
          infiniteLoop="true"
          interval="2000"
          autoPlay
        >
          {selected.pics.map(item => {
            return (
              <div>
                <img src={item.url} alt=" " className="mainSliderrrr" />
              </div>
            );
          })}
        </Carousel>
      </>
    );
  }

  componentDidUpdate() {
    console.log("uploading pic" + this.inputRes, this.all_pics);
    try {
      for (var i = 0; i < this.inputRes.length; i++) {
        console.log("inside loop", this.all_pics[i].url);
        this.inputRes[i].style.backgroundImage =
          "url(" + this.all_pics[i].url + ")";
      }
    } catch (e) {
      console.log("error occured");
    }
  }

  shouldComponentUpdate() {
    return true;
  }
}

export default ImageSliderComp;
