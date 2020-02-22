export default (state = { currentSelected: -1, previousSelected: -1,first:1 }, action) => {
  switch (action.type) {
    case "switchSideTab":
      console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiin switch tab ",action.payload);
     //for the first click....when nothing is clicked
    if (state.first === 1) {
      state={
        currentSelected: action.payload,
        previousSelected: action.payload,
        first: 0
      };
    } else {
      state={
        currentSelected: action.payload,
        previousSelected: state.currentSelected
      };
    }
      break;
    case "changeSelectedSide":
      
     state={ 
      currentSelected: action.payload.current,
      previousSelected: action.payload.previous
     }
    
    
     break;
    case "closeAllSideNav":
         state={
           currentSelected:-1,
           previousSelected:action.payload,
           first:1
         }


      break;
     case "logoutForSideNav":
         state={
           currentSelected:-1,
           previousSelected:-1,
           first:1
         }


      break;      
    
    default:
      break;
  }
  return state;
};
