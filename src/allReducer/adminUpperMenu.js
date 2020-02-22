export default (state = { selected: -1, previous: -1 }, action) => {
  switch (action.type) {
    case "switchTab":
      
      if (state.selected === state.previous && state.previous === -1) {
        state = {
          selected: action.payload,
          previous: -1
        };
      } else {
        state = {
          selected: action.payload,
          previous: state.selected
        };
      }

      break;
    case "closeTabSelectedOne":
      var tempArray = action.payload.array1;
      var lastClicked = action.payload.current;
      

      // if the tab being removed is the last
      if (lastClicked === -1) {
        if (tempArray.length === 1) {
          state = {
            previous: -1,
            selected: -1
          };
        }
        //no need to change the state
      } else {
        state = {
          selected: lastClicked,
          previous: state.selected
        };
      }

      break;
    case "closeTabUnselectedOne":
      var tempArray = action.payload.array1;
      var lastClicked = action.payload.current;
    

      //if the tab being removed is at right of the selected one than we don't have to change any states.
      if (lastClicked >= state.selected) {
        ///do nothing
      } //if the tab being removed is at left of the selected one.
      else {
        state = {
          selected: state.selected - 1,
          previous: state.selected
        };
      }

      break;
       case "logoutForUpperMenu":
           state = {
          selected:-1,
          previous: -1
        }; 
           break;
    default:
      break;
  }
  return state;
};
