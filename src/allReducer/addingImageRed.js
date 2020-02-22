const addingImageRed = (
  state = {
    allData: {},
    selectedData: null,
    selectedFile: null,
    showImgMenu: 0,
    showAll: 1,
    showAddingImage: 0
  },
  action
) => {
  switch (action.type) {
    case "initializeIt":
      state = {
        allData: action.payload.allData,
        selectedData: null,
        selectedFile: null,
        showImgMenu: 0,
        showAll: 1,
        showAddingImage: 0
      };
      break;
    case "afterImageAdded":
      state = {
        ...state,
        selectedData: action.payload.selectedData,
        showImgMenu: 1,
        showAll: 0,
        showAddingImage: 0
      };
      break;
    case "getBackToShowAll":
      state = {
        ...state,
        selectedData: null,
        showImgMenu: 0,
        showAll: 1,
        showAddingImage: 0
      };
      break;
    case "getBackToEditMenu":
      state = {
        ...state,
        selectedData: action.payload.selectedData,
        showImgMenu: 1,
        showAll: 0,
        showAddingImage: 0
      };
      break;
    case "getBackToEditMenuNotUpdate":
      state = {
        ...state,
        showImgMenu: 1,
        showAll: 0,
        showAddingImage: 0
      };
      break;
    case "goToEditMenu":
      state = {
        ...state,
        selectedData: action.payload.selectedData,
        showImgMenu: 1,
        showAll: 0,
        showAddingImage: 0
      };
      break;
    case "addingImagesScreen":
      state = {
        ...state,
        selectedFile: action.payload.selectedFile,
        showImgMenu: 0,
        showAll: 0,
        showAddingImage: 1
      };
      break;
    default:
      break;
  }
  return state;
};

export default addingImageRed;
