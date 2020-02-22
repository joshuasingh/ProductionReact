import React from "react";

var paraStyle = {
  "font-family": "Times New Roman",
  "text-shadow": "grey 1px 2px 3px",
  "margin-top": "4vh !important",
  "font-size": "4vh"
};

var allRef = null;

export const allMenuData = (data, ref) => {
  return (
    <div className="row adminRow1" ref={ree => (allRef = ree)}>
      {data.map((item, key) => {
        console.log("getting url info", item);

        return item.title === "mainPageSlider" ? (
          <></>
        ) : (
          <div className="col-md-4 mb-5">
            <div className="card h-100 cardAdmin ">
              <div className="card-body removeAdmin1">
                <div className="card-text">
                  <p style={paraStyle}>{item.title}</p>
                </div>
              </div>
              <div
                className="card-body removeAdmin"
                onClick={e => {
                  // this.props.changeTheDetail(index);
                  getToEditMenu(item, ref);
                }}
              >
                <p className="card-text1 adminText">Add Or Remove Pictures</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

//set the layout of each menuitem
const compdata = (items, reff) => {
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
                    getToEditMenu(items, reff);
                  }}
                >
                  Add or Remove Pics
                </li>
              </a>
            </ul>
          </div>
          <div className="parent">select</div>
        </div>
      </div>

      <p className="heading">{items.title}</p>
      <p className="details">{items.value}</p>
    </div>
  );
};

//getting edit menu
const getToEditMenu = (val, thiss) => {
  console.log("this id will be", val._id);

  thiss.props.getToEditMenu({ selectedData: val._id });
};
