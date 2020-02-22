import React from "react";
import { Rolling } from "react-loading-io";
import axios from "axios";
import { connect } from "react-redux";

class ViewAllAdmin extends React.Component {
      
     //pop up menu reference 
      popRef=null

      removingId=null;
  
  
  
  constructor(props) {
    super(props);

    this.loader = this.loader.bind(this);
    this.removeIt = this.removeIt.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setPopUpRef=this.setPopUpRef.bind(this)
  }

  allRef = null;

  testData = [
    { username: "joshua", email: "joshuasingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    { username: "joy", email: "joshuingh5222gmail.com" },
    // { username: "joy", email: "joshuingh5222gmail.com" },
    // { username: "joy", email: "joshuingh5222gmail.com" },
    // { username: "joy", email: "joshuingh5222gmail.com" }
  ];

  //the sloading spinner
  // Use Component
  loader = () => {
    return (
      <div className="loaderImage" ref={ree => (this.loaderRef = ree)}>
        <Rolling size={100} />
      </div>
    );
  };
 
   setPopUpRef(ree) {
    console.log("getting popup ref");
    this.popRef = ree;
  }


  //enable the background
  enableBack()
  {
            this.popRef.style.display="none"
            this.allRef.style.opacity = 1;
            this.backButton.style.opacity =1;
            this.backButton.disabled=false
  }


  removeAccountPer()
  {
    //showing the loader image
    this.loaderRef.style.display="inline"
   
    this.popRef.style.display="none"



    var data1 = {
      id: this.removingId
    };
    
    axios
      .post(
        "https://nh65v.sse.codesandbox.io/adminSetting/removeAccount",
        data1
      )
      .then(
        res => {
          if (res.data.error === "tokenPro") {
            this.loaderRef.style.display="none"
             this.enableBack()
            alert("you need to login first ");
          } else if (res.data.error === "InternalError") {
             this.loaderRef.style.display="none"
             this.enableBack()
            alert("Oops, there's was an error please try again");
          } else {
            console.log("uploading done");
            this.loaderRef.style.display="none"
             this.enableBack()
            this.props.setAdminValues(res.data.result);
          }
        },
        err => {
          //clasing up loading icon
         this.loaderRef.style.display="none"
             this.enableBack() 
             alert("Oops, there's was an error please try again");

          console.log("in error here" + err);
        }
      );

  }

  //confirmation to remove account
    popUpView() {
    return (
      <div
        className="form-popup-AllAdmin"
        id="myForm"
        ref={ree => this.setPopUpRef(ree)}
      >
        <div className="form-container">
          <label className="text text-admin">
            <b>Are you sure you want to delete the Account ?</b>
          </label>
        
          <button
          className="btn btn-primary yesAdmin"
          onClick={()=>{
               this.removeAccountPer()
          }}
        >
          Yes
        </button>
         <button
          className="btn btn-primary noAdmin"
          onClick={()=>{
           this.enableBack()
       }}
        >
          No
        </button> 
 



        </div>
      </div>
    );
  }

  

  paraStyle=
  {
   "font-family":"Times New Roman",
   "text-shadow":"grey 1px 2px 3px"
  }



  //remove the account
  removeIt(idd) {
 
  this.removingId=idd
   
   //diming the background and disabling 
   this.allRef.style.opacity = 0.2;

   this.backButton.style.opacity = 0.2;
  
   this.backButton.disabled=true

   this.popRef.style.display = "inline";


   
  }

  goBack() {
    this.props.selection(-1);
  }

  render() {
    console.log("in render of viewalladmin", this.props.InLog.allAdmin);

    return (
      <>
        {this.loader()}
       
          <button
          className="btn btn-primary viewAdminBack"
          onClick={() => this.goBack()}
          ref={ree => {
            this.backButton = ree;
          }}
        >
          Back
        </button>

        <div className="row adminRow" ref={ree => (this.allRef = ree)} >
          {this.props.InLog.allAdmin.map((item, key) => {
            console.log("getting url info", item);

            return (
              <div className="col-md-4 mb-5">
                <div className="card h-100 cardAdmin ">
                  <div className="card-body removeAdmin1">
                 <div className="card-text">  
                   <p style={this.paraStyle}>{item.username}</p>
                   <p style={this.paraStyle}>{item.email}</p>
                 </div>    
                  </div>
                  <div className="card-body removeAdmin"  
                   onClick={e => {
                            this.removeIt(item._id);
                          }}>
                    <p className="card-text1 adminText">remove it</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {this.popUpView()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    InLog: state.AdminLoginRights
     
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
    setAdminValues: val => {
      dispatch({
        type: "updateAdminList",
        payload: val
      });
    },
    selection: val => {
      dispatch({
        type: "toggle",
        payload: val
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAllAdmin);
