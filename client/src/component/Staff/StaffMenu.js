import React from 'react'
import { Link } from 'react-router-dom';

const StaffMenu = (props) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light w-100">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/staff" className={props.activeItem === 1 ? "nav-link active" : "nav-link link-dark"} aria-current="page">
            Dashboard
          </Link>
        </li>
        <hr />
        <li>
          <Link to="/staff/orders" className={props.activeItem === 2 ? "nav-link active" : "nav-link link-dark"}>
            Orders
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default StaffMenu;