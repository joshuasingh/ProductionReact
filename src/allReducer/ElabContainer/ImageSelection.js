const ImageSelection = (
  state = {
    history: null
  },
  action
) => {
  switch (action.type) {
    case "initiateAllTabs":
      //this is called from when details load again
      // if (state.history === null || state.history.length !== action.payload) {
      var temp = [];
      //no of rows in vertical tabs
      var count = action.payload;

      for (var i = 0; i < count; i++) {
        temp[i] = { currentSelected: -1, previousSelected: -1, status: -1 };
      }
      console.log("in initializing called from vertical", temp.length);

      state = { history: temp };
      // }

      break;
    case "setClick":
      console.log(
        "set click called",
        action.payload.index,
        action.payload.currentSel,
        state.history.length
      );
      var index = action.payload.index;

      var temp = state.history;
      if (state.history[index].status === -1) {
        console.log("in setclclick success status -1");
        temp[index] = {
          currentSelected: action.payload.currentSel,
          previousSelected: -1,
          status: 0
        };
      } else if (state.history[index].status === 0) {
        //previous currentSelected state
        console.log("in setclclick success status 0");
        var cur = temp[index].currentSelected;
        temp[index] = {
          currentSelected: action.payload.currentSel,
          previousSelected: cur,
          status: 0
        };
      } else if (state.history[index].status === 1) {
        //previous currentSelected state
        console.log("in setclclick success status 1");
        var cur = temp[index].currentSelected;
        temp[index] = {
          currentSelected: action.payload.currentSel,
          previousSelected: cur,
          status: 0
        };
      }

      state = { history: temp };

      break;
    case "setReset":
      console.log("close call");
      var temp = state.history;

      temp[action.payload] = {
        currentSelected: -1,
        previousSelected: temp[action.payload].currentSelected,
        status: -1
      };

      state = { history: temp };
      break;
    case "toggleImageWindow":
      //when changing from image window to another in vertical tab and setting status as zero

      //temporary array
      var temp = state.history;

      //tab information of current opened tab
      var temptab = temp[action.payload];

      console.log("in toggle window reducer", temp);
      // var refer = action.payload.refer;

      //remove the border selected right now

      temp[action.payload] = {
        currentSelected: temptab.currentSelected,
        previousSelected: temptab.previousSelected,
        status: 1
      };

      state = { history: temp };

      break;

    default:
      break;
  }
  return state;
};

export default ImageSelection;
