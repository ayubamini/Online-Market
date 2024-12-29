import React from 'react';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <Outlet />
            <footer className="bg-custom-light px-5 py-4 mt-5">
                <div className='row justify-content-between'>
                    <div className="col-12 col-md-3 mb-2">
                        <h4>CUSTOMER SERVICE</h4>
                        <div className='row mb-2'><Link to='/contactus' className='text-decoration-none'>Contact Us</Link></div>
                        <div className='row mb-2'><Link to='/myaccount/orderhistory' className='text-decoration-none'>Order Tracking</Link></div>
                    </div>
                    {/*}
                    <div className="col-12 col-md-3 mb-2">
                        <h4>SERVICES</h4>
                        <div className='row mb-2'><Link to='#return-policy' className='text-decoration-none'>Return Policy</Link></div>
                        <div className='row mb-2'><Link to='#delivery' className='text-decoration-none'>Delivery Policy</Link></div>
                    </div>*/}
                    <div className="col-12 col-md-3 mb-2">
                        <h4>ABOUT</h4>
                        <div className='row mb-2'><Link to='/aboutus' className='text-decoration-none'>About Us</Link></div>
                        <div className='row mb-2'><Link to='/faq' className='text-decoration-none'>FAQ</Link></div>
                    </div>
                    <div className="col-12 col-md-3 mb-2">
                        <h4>PAYMENT</h4>
                        <div className="row justify-content-start">
                            <div className='col-2'><FaCcVisa size="2em" /></div>
                            <div className='col-2'><FaCcMastercard size="2em" /></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;