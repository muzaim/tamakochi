import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 40,
  },
};
const colors = ["red", "green", "blue", "orange", "lime", "black"];

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const Simple = ({ deviceType }) => {
  return (
    <div style={{ border: "2px solid black" }}>
      <Carousel
        // partialVisbile
        deviceType={deviceType}
        itemClass="image-item"
        responsive={responsive}
        infinite={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      >
        {colors.map((color) => {
          return (
            <div style={{ background: color, width: 300, height: 300 }}>
              hello
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Simple;
