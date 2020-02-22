import React from "react";
import $ from "jquery";

class TestFirstPage extends React.Component {
  toShow() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          {/* <!-- Collapse button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* <!-- Collapsible content --> */}
          <div className="collapse navbar-collapse" id="basicExampleNav">
            {/* <!-- Links --> */}
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link fss-nav-item" href="#view-1">
                  View 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fss-nav-item" href="#view-2">
                  View 2
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fss-nav-item" href="#view-3">
                  View 3
                </a>
              </li>

              {/* <!-- Dropdown --> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Subviews
                </a>
                <div
                  className="dropdown-menu dropdown-primary"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item fss-nav-item" href="#subview-a">
                    Subview A
                  </a>
                  <a className="dropdown-item fss-nav-item" href="#subview-b">
                    Subview B
                  </a>
                </div>
              </li>
            </ul>
            {/* <!-- Links --> */}

            <form className="form-inline">
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
          {/* <!-- Collapsible content --> */}
        </nav>
        {/* <!--/.Navbar--> */}

        <div className="full-screen-scroller">
          <div className="fss-dotted-scrollspy">
            <button type="button" className="fss-nav-btn fss-mainview-prev">
              <i className="fas fa-chevron-up" />
            </button>
            <a href="#view-1" className="fss-nav-item active" />
            <a href="#view-2" className="fss-nav-item" />
            <a href="#view-3" className="fss-nav-item" />
            <button type="button" className="fss-nav-btn fss-mainview-next">
              <i className="fas fa-chevron-down" />
            </button>
          </div>

          <div fss-anchor="view-1" className="fss-mainview fss-active">
            <div className="fss-subview">
              <div className="fss-dotted-scrollspy">
                <button type="button" className="fss-nav-btn fss-subview-prev">
                  <i className="fas fa-chevron-left" />
                </button>
                <a href="#subview-a" className="fss-nav-item active" />
                <a href="#subview-b" className="fss-nav-item" />
                <button type="button" className="fss-nav-btn fss-subview-next">
                  <i className="fas fa-chevron-right" />
                </button>
              </div>

              <div
                fss-anchor="subview-a"
                className="fss-subview-item subview-a"
              >
                <div className="box">
                  <div className="info">
                    <p>View 1</p>
                    <p>Subview A</p>
                  </div>
                </div>
              </div>

              <div
                fss-anchor="subview-b"
                className="fss-subview-item fss-active"
              >
                <div className="box">
                  <div className="info">Subview B</div>
                </div>
              </div>
            </div>
          </div>

          <div fss-anchor="view-2" className="fss-mainview">
            <div className="box">
              <div className="info">View 2</div>
            </div>
          </div>

          <div fss-anchor="view-3" className="fss-mainview">
            <div className="box">
              <div className="info">View 3</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <div className="alert">{this.toShow()}</div>
      </>
    );
  }
}

export default TestFirstPage;
