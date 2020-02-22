const ShowExpandedImage = (
  state = {
    allTabRef: null
  },
  action
) => {
  switch (action.type) {
    case "ExpandedImageInitiate":
      //this is called from when details load again
      if (
        state.allTabRef === null ||
        state.allTabRef.length !== action.payload
      ) {
        var temp = [];

        console.log("in expanded image reducer", action.payload);
        //no of rows in vertical tabs
        var count = action.payload;

        for (var i = 0; i < count; i++) {
          temp[i] = { status: -1, currentUrl: "", currentCaption: "" };
        }
        state = { allTabRef: temp };
      }
      break;
    case "setImageStatus":
      console.log("image status is set....");
      var index = action.payload.index;
      var url = action.payload.url;
      var caption = action.payload.caption;

      var temp = state.allTabRef;
      temp[index] = { status: 0, currentUrl: url, currentCaption: caption };
      state = { allTabRef: temp };
      break;
    case "resetEnlargedImage":
      console.log("in reset Enlarged image");
      var temp = state.allTabRef;
      temp[action.payload.index] = {
        status: -1,
        currentUrl: "",
        currentCaption: ""
      };
      state = { allTabRef: temp };
      break;
    default:
      break;
  }
  return state;
};

export default ShowExpandedImage;
