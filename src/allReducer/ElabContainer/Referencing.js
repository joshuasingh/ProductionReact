const Referencing = (
  state = {
    imageElabRef: null
  },
  action
) => {
  switch (action.type) {
    case "ImageSliderRefer":
      console.log("reference set of imageElab");
      state = { imageElabRef: action.payload, history: state.history };
      break;
    case "callTest":
      state.imageElabRef.testingFunc();
      break;
    default:
      break;
  }
  return state;
};

export default Referencing;
