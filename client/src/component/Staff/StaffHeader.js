import React from 'react'

import logo from '../../image/logo.png';
import { Link } from 'react-router-dom';
import LogoutButton from '../shared/LogoutButton';

const StaffHeader = () => {
  return (
    <div className="container">
      <div className='row'>
        <div className='text-end pt-1'>
          <Link to='/' target="_blank" rel="noopener noreferrer">
            Go Shopping 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ms-1 bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
            </svg>
          </Link>
        </div>
      </div>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="logo col-3">
          <Link to='/'>
            <img src={logo} alt="Logo" className='header-logo'/>
          </Link>
        </div>

        <ul className="nav col-9 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><h2>Staff Portal</h2></li>
        </ul>

        <div className="col-md-3 text-end">
          <LogoutButton />
        </div>
      </header>
      <div id="liveAlertPlaceholder"></div>
    </div>
  )
}

export default StaffHeader;