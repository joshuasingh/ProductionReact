import React from "react";
import { Slide } from "react-slideshow-image";

const slideImages = [
  "http://lorempixel.com/output/cats-q-c-640-480-9.jpg",
  "http://lorempixel.com/output/cats-q-c-640-480-10.jpg",
  "http://lorempixel.com/output/cats-q-c-640-480-11.jpg"
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

const Slideshow = () => {
  return (
    <Slide {...properties}>
      <div className="each-slide">
        <div style={{ backgroundImage: `url(${slideImages[0]})` }} />
      </div>
      <div className="each-slide">
        <div style={{ backgroundImage: `url(${slideImages[1]})` }} />
      </div>
      <div className="each-slide">
        <div style={{ backgroundImage: `url(${slideImages[2]})` }} />
      </div>
    </Slide>
  );
};

export default Slideshow;
