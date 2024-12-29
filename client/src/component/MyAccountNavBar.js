import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

const MyAccountNavBar = ({ active }) => {

    return (
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link to="/myaccount/orderhistory" className='text-decoration-none'>
                <button className={classNames("nav-link", active === 1 ? 'active' : '')} id="nav-orders-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-orders" aria-selected="true">
                    My Orders
                </button>
            </Link>
            <Link to="/myaccount" className='text-decoration-none'>
                <button className={classNames("nav-link", active === 2 ? 'active' : '')} id="nav-account-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-account" aria-selected="false">
                    My Account
                </button>
            </Link>
            {/*
            <Link to="/myaccount/changepw" className='text-decoration-none'>
                <button className={classNames("nav-link", active === 3 ? 'active' : '')} id="nav-account-tab" data-bs-toggle="tab" data-bs-target="#nav-change-password" type="button" role="tab" aria-controls="nav-account" aria-selected="false">
                    Change Password
                </button>
            </Link> */}
        </div>
    )

}

export default MyAccountNavBar


