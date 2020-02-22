import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";
import { ConfirmToDeleteModal } from "../AdminComponents/ConfirmToDeleteModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class ManipulateMenuData extends React.Component {
  //ref of popUp Window
  popRef = null;

  //picked item val
  pickedVal = null;

  //for edit title and edit value
  editedTitle = null;
  editedValue = null;

  //new value and title for menu item
  newTitle = null;
  newValue = null;

  //reference of the loader icon
  loaderRef = null;
  loaderRefMenu = null;

  constructor(props) {
    super(props);

    this.state = {
      removingItem: null,
      showModal: false,
      updated: 0,
      calledState: 0,
      EditStateVal: null,
      AddMenu: 0,
      showAll: 1,
      data: this.props.data
    };

    this.removeMenuitem = this.removeMenuitem.bind(this);

    this.getBackFromAdding = this.getBackFromAdding.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.EditMenuitem=this.EditMenuitem.bind(this)
  }

  removeMenuitem() {
    console.log("remove called", this.pickedVal);

    const data = { id: this.state.removingItem._id };

    //close the popup
    this.popRef.style.display = "none";
    this.pickedVal = null;

    //show up loading icon
    this.loaderRefMenu.style.display = "inline";

    //call the server to remove the menu item
    axios.post("https://nh65v.sse.codesandbox.io/menuItemsRemoval", data).then(
      res => {
        if (res.data.error === "tokenPro") {
          this.loaderRefMenu.style.display = "none";
          alert("you need to login first ");
        } else {
          console.log("done", res.data.result);
          //clasing up loading icon
          this.loaderRefMenu.style.display = "none";

          this.props.setUserInfo(res.data.result);
          this.setState({
            showModal: false
          });
        }
      },
      err => {
        //clasing up loading icon
        this.loaderRefMenu.style.display = "none";
        console.log("invalid credential", err.status);
      }
    );
  }

  setPopUpRef(ree) {
    console.log("getting popup ref");
    this.popRef = ree;
  }

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loader" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={64} />;
      </div>
    );
  };

  loaderForMenu = () => {
    return (
      <div className="loader1" ref={ree => (this.loaderRefMenu = ree)}>
        <Rolling size={64} />;
      </div>
    );
  };

  popUpView() {
    return (
      <div
        className="form-popup"
        id="myForm"
        ref={ree => this.setPopUpRef(ree)}
      >
        <form action="/action_page.php" className="form-container">
          <label className="text">
            <b>Are you sure you want to delete the Data ?</b>
          </label>
          <button
            type="button"
            className="btn OK"
            onClick={() => {
              this.removeMenuitem();
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              this.closeForm();
            }}
          >
            No
          </button>
        </form>
      </div>
    );
  }

  //popup view
  getPopPermission(itemValue) {
    this.popRef.style.display = "block";
    this.pickedVal = itemValue;
  }

  //close popUp View
  closeForm() {
    this.popRef.style.display = "none";
    this.pickedVal = null;
  }

  //getting edit menu
  getToEditMenu(val) {
    this.props.setBackButtonStatus();

    this.setState({
      calledState: 1,
      EditStateVal: val,
      AddMenu: 0,
      showAll: 0
    });
  }

  //set the layout of each menuitem
  compdata(item) {
    return (
      <div className="MenuData">
        <div id="demo">
          <div className="wrapper">
            <div className="content">
              <ul>
                <a href="#">
                  <li
                    onClick={() => {
                      // this.props.changeTheDetail(index);
                      this.getPopPermission(item);
                    }}
                  >
                    Remove
                  </li>
                </a>
                <a href="#">
                  <li
                    onClick={() => {
                      this.getToEditMenu(item);
                    }}
                  >
                    Edit
                  </li>
                </a>
              </ul>
            </div>
            <div className="parent">select</div>
          </div>
        </div>

        <p className="heading">{item.title}</p>
        <p className="details">{item.value}</p>
      </div>
    );
  }

  //make the call to server to update doc
  UpdateDoc = async () => {
    var id = this.state.EditStateVal._id;
    var title = this.editedTitle;
    var value = this.editedValue;

    //initialize the spinner movement
    this.loaderRef.style.display = "inline";

    const data = {
      id: id,
      title: title,
      value: value
    };

    //call the server to update the menu item
    axios.post("https://nh65v.sse.codesandbox.io/updateData", data).then(
      res => {
        if (res.data.error === "tokenPro") {
          this.loaderRef.style.display = "none";
          alert("you need to login first ");
          this.setState({
            calledState: 0,
            EditStateVal: null,
            AddMenu: 0,
            showAll: 1
          });
        } else {
          console.log("done");
          //clasing up loading icon
          this.loaderRef.style.display = "none";
          this.setState({
            calledState: 0,
            EditStateVal: null,
            AddMenu: 0,
            showAll: 1
          });
          this.props.setUserInfo(res.data.result);
        }
      },
      err => {
        //clasing up loading icon
        this.loaderRef.style.display = "none";
        console.log("invalid credential");

        this.setState({
          calledState: 0,
          EditStateVal: null,
          AddMenu: 0,
          showAll: 1
        });
      }
    );

    console.log("updated");
  };

  //make request to edit menu
  // EditMenuitem() {
  //   console.log("Edit called" + this.editedTitle + this.editedValue);
  //   this.editedTitle === null
  //     ? (this.editedTitle = this.state.EditStateVal.title)
  //     : " ";

  //   this.editedValue === null
  //     ? (this.editedValue = this.state.EditStateVal.value)
  //     : " ";

  //   this.UpdateDoc();
  // }

  // edit the menu data
  editMenu() {
    var val = this.state.EditStateVal;
    return (
      <div className="editMenuCls">
        <Form>
          <Form.Group as={Form.Row} controlId="exampleForm.ControlInput1">
            <Form.Label sm="2">Email address</Form.Label>
            <Form.Col sm="10">
              <Form.Control type="text" placeholder="Enter the title" />
            </Form.Col>
          </Form.Group>

          <Form.Group as={Form.Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label sm="2">Example textarea</Form.Label>
            <Form.Col sm="10">
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Give the Description"
              />
            </Form.Col>
          </Form.Group>
        </Form>
      </div>

      // <div className="container-fluid" id="gridViewforAdmin">
      //   <div className="form-popup-Edit" id="myForm">
      //     <form className="form-container">
      //       <label className="text">
      //         <b>Title:</b>
      //       </label>
      //       <textarea
      //         rows="4"
      //         cols="60"
      //         className="EditTitle"
      //         onChange={e => {
      //           this.editedTitle = e.target.value;
      //         }}
      //       >
      //         {val.title}
      //       </textarea>
      //       <label className="text">
      //         <b>Detail:</b>
      //       </label>
      //       <textarea
      //         rows="4"
      //         cols="60"
      //         className="EditValue"
      //         onChange={e => {
      //           this.editedValue = e.target.value;
      //         }}
      //       >
      //         {val.value}
      //       </textarea>

      //       <button
      //         type="button"
      //         className="btn OK"
      //         onClick={() => {
      //           this.EditMenuitem();
      //         }}
      //       >
      //         Commit
      //       </button>
      //       <button
      //         type="button"
      //         className="btn cancel"
      //         onClick={() => {
      //           this.getBackFromAdding();
      //         }}
      //       >
      //         Back
      //       </button>
      //     </form>
      //     {this.loader()}
      //   </div>
      // </div>
    );
  }

  //getting edit menu
  getToAddMenu() {
    this.props.setBackButtonStatus();
    this.setState({
      calledState: 0,
      AddMenu: 1,
      showAll: 0
    });
  }

  paraStyle = {
    "font-family": "Times New Roman",
    "text-shadow": "grey 1px 2px 3px",
    "margin-top": "4vh !important",
    "font-size": "4vh"
  };

  rowStyle = {
    "padding-top": "12px"
  };

  addButtonStyle = {
    height: "62px",
    "min-height": "50px",
    "margin-top": "10px"
  };

  //all showing menu
  allMenu() {
    console.log(
      " in render of allMenu and alldata is",
      this.props.user1.mainData
    );
    return (
      <>
        <div className="row adminRow">
          {this.props.user1.mainData.map((item, key) => {
            console.log("getting url info", item);

            return item.title === "mainPageSlider" ? (
              <></>
            ) : (
              <div className="col-md-4 mb-5">
                <div className="card h-100 cardAdmin ">
                  <div className="card-body removeAdmin1">
                    <div className="card-text">
                      <p style={this.paraStyle}>{item.title}</p>
                    </div>
                  </div>
                  <div className="card-body removeAdmin">
                    <p
                      className="card-text1 adminText adminText11"
                      onClick={() => {
                        this.getToEditMenu(item);
                      }}
                    >
                      Edit
                    </p>
                    <p
                      className="card-text1 adminText adminText11"
                      onClick={() => {
                        // this.props.changeTheDetail(index);
                        this.setState({
                          showModal: true,
                          removingItem: item
                        });
                        //this.getPopPermission(item);
                      }}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="primary"
          style={this.addButtonStyle}
          onClick={() => {
            this.getToAddMenu();
          }}
        >
          Add New Menu item
        </Button>

        <div> {this.loaderForMenu()}</div>
      </>
    );
  }

  //make the call to server to update doc
  addMenuitemProgress = async () => {
    //initialize the spinner movement
    this.loaderRef.style.display = "inline";

    var data = {
      title: this.newTitle,
      value: this.newValue
    };

    //call the server to update the menu item
    axios.post("https://nh65v.sse.codesandbox.io/addMenuData", data).then(
      res => {
        if (res.data.error === "tokenPro") {
          this.loaderRef.style.display = "none";
          alert("you need to login first ");
          this.setState({
            calledState: 0,
            EditStateVal: null,
            AddMenu: 0,
            showAll: 1
          });
        } else {
          console.log("done");
          //clasing up loading icon
          this.loaderRef.style.display = "none";
          this.setState({
            calledState: 0,
            EditStateVal: null,
            AddMenu: 0,
            showAll: 1
          });
          this.props.setUserInfo(res.data.result);
        }
      },
      err => {
        //clasing up loading icon
        this.loaderRef.style.display = "none";
        console.log("invalid credential");

        this.setState({
          calledState: 0,
          EditStateVal: null,
          AddMenu: 0,
          showAll: 1
        });
      }
    );
  };

  //getting back from adding menu
  getBackFromAdding() {
    this.setState({
      updated: 0,
      calledState: 0,
      EditStateVal: null,
      AddMenu: 0,
      showAll: 1
    });
  }

  //handle remove menu item
  handleRemove() {
    this.removeMenuitem();
  }

  //handle not removing menu item
  handleNo() {
    this.setState({
      showModal: false
    });
  }

  //Add menu page
  addMenuItem() {
    return (
      <div className="container-fluid" id="gridViewforAdmin">
        <div className="form-popup-Edit" id="myForm">
          <form className="form-container">
            <label className="text">
              <b>Title:</b>
            </label>
            <textarea
              rows="4"
              cols="60"
              className="EditTitle"
              onChange={e => {
                this.newTitle = e.target.value;
              }}
            />
            <label className="text">
              <b>Detail:</b>
            </label>
            <textarea
              rows="4"
              cols="60"
              className="EditValue"
              onChange={e => {
                this.newValue = e.target.value;
              }}
            />

            <button
              type="button"
              className="btn OK"
              onClick={() => {
                this.addMenuitemProgress();
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                this.getBackFromAdding();
              }}
            >
              Back
            </button>
          </form>
          {this.loader()}
        </div>
      </div>
    );
  }

  render() {
    console.log("rendering menu data");
    return (
      <>
        <ConfirmToDeleteModal
          showModal={this.state.showModal}
          handleRemove={this.handleRemove}
          handleNo={this.handleNo}
        />
        {this.state.calledState === 1 ? this.editMenu() : " "}
        {this.state.AddMenu === 1 ? this.addMenuItem() : " "}
        {this.state.showAll === 1 ? this.allMenu() : " "}

        {this.popUpView()}
      </>
    );
  }

  componentDidMount() {
    this.props.gettingChildRef(this);
  }
}

const mapStateToProps = state => {
  return {
    user1: state.AdminDetailView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: name => {
      dispatch({
        type: "update",
        payload: name
      });
    },
    initialize: name => {
      dispatch({
        type: "initial",
        payload: name
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManipulateMenuData);
