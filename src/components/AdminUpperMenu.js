import React from "react";
import { useState, useEffect } from "react";
import AdminUpperMenutab from "../components/AdminUpperMenuTab";
import { connect } from "react-redux";

class AdminUpperMenu extends React.Component {
  render() {
    var styling = {
      display: "inline"
    };

    return (
      <>
        <div className="adminUpperTab ">
          <AdminUpperMenutab
            tabList={this.props.tempDataForHeader}
            removeHeader={this.props.removeHeader}
            setDetail={this.props.setDetail}
            goBackToInitial={this.props.goBackToInitial}
          />
        </div>
      </>
    );
  }

  componentDidUpdate() {}
}

const mapStateToProps = state => {
  return {
    user1: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUpperMenu);
