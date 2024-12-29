import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logo } from "../../image";
import LogoutButton from "../shared/LogoutButton";

class Header extends Component {
  render() {
    return (
      <header className="d-flex flex-wrap align-items-left justify-content-left justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link className="navbar-brand" to='/'>
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="100"
              className="d-inline-block align-text-top"
            />
          </Link>
        </div>
          {/* Change this to actual logout later (/admin/logout), now redirecting to root */}
          <LogoutButton />
      </header>
     
    );
  }
}

export default Header;
