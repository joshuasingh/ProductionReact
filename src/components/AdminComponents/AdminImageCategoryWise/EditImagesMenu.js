import React from "react";
import axios from "axios";
import lodash from "lodash";
import { Rolling } from "react-loading-io";

// edit the menu data
//selected images to be deleted
var onClickedImages = [];

//refer all the screen elements
var allRef = null;

export const editImagesMenu = ref => {
  console.log("start of image menu", ref.props.fromAddingImage.selectedData);
  const res = lodash.filter(
    ref.props.user1.mainData,
    e => e._id === ref.props.fromAddingImage.selectedData
  );

  var result = {};
  if (res[0]) {
    result = res[0];
    console.log("in editmenu arra ", res);
  } else {
    result = res;
    console.log(
      "in editmenu not arra",
      ref.props.user1.mainData,
      " ------",
      ref.props.fromAddingImage.selectedData
    );
  }

  return (
    <>
      {loader()}
      <div className="allRefering" ref={ree => (allRef = ree)}>
        <h1 className="galleryHeader">Gallery Images</h1>
        <div className="gallery galleryAdmin">
          {result.pics.map((item, key) => {
            console.log("getting url info", item);
            return (
              <img
                src={item.url}
                alt=""
                id="startImg"
                onClick={e => selectedImg(e, item.url, item.path)}
              />
              // </a>
            );
          })}
        </div>

        <div className="addImage">
          <button
            className="btn btn-primary viewAdminBack backButtonEditImage"
            onClick={() => {
              ref.props.getToShowAll();
            }}
            ref={ree => {}}
          >
            Back
          </button>

          <input
            className="fileButtonEditImage"
            type="file"
            onChange={e => fileChangedHandler(e, ref)}
            multiple
          />

          <button
            className="btn btn-primary viewAdminBack  removeButtonEditImage"
            onClick={() => {
              removeHandler(ref);
            }}
            ref={ree => {}}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

//reference to loader icon
var loaderRef = null;

const fileChangedHandler = (event, refer) => {
  console.log("file uploaded");

  refer.props.addingImagesScreen({ selectedFile: event.target.files });
};

const selectedImg = (e, url, path) => {
  if (e.target.id === "selectImg") {
    var ind = onClickedImages.indexOf(path);
    console.log("index ", ind);
    onClickedImages.splice(ind, 1);
    e.target.id = "startImg";
  } else {
    onClickedImages.push(path);
    e.target.id = "selectImg";
  }

  console.log("selected image", onClickedImages);
};

//the sloading spinner
// Use Component
const loader = () => {
  return (
    <div className="loaderImage" ref={ree => (loaderRef = ree)}>
      <Rolling size={100} />;
    </div>
  );
};

const removeHandler = async refer => {
  if (onClickedImages.length === 0) {
    alert("please select a  image to remove");
  } else {
    console.log(
      onClickedImages,
      "  ",
      refer.props.fromAddingImage.selectedData
    );

    //setting up the loader image and diming backgroud
    //showing the loader
    loaderRef.style.display = "inline";

    //diming the background
    allRef.style.opacity = 0.2;

    var temp = [];

    onClickedImages.map(val => {
      temp.push({ Key: val });
    });

    onClickedImages = [];

    const data = {
      url: temp,
      id: refer.props.fromAddingImage.selectedData
    };

    axios
      .post("https://nh65v.sse.codesandbox.io/mainImages/removeUrlUpload", data)
      .then(
        res => {
          if (res.data.error === "tokenPro") {
            loaderRef.style.display = "none";

            //Undiming the background
            allRef.style.opacity = 0;

            alert("you need to login first ");
          } else if (res.data.error === "InternalError") {
            loaderRef.style.display = "none";

            //Undiming the background
            allRef.style.opacity = 0;

            alert("Oops, there's was an error please try again");
          } else {
            console.log("removal done", res.data.result);

            loaderRef.style.display = "none";

            // //Undiming the background
            allRef.style.opacity = 1;

            //updating the info
            refer.props.setUserInfo(res.data.result);
            refer.props.AfterUpload({
              selectedData: refer.props.fromAddingImage.selectedData
            });
          }
        },
        err => {}
      );
  }
};
