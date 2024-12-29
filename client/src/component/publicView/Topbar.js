import React from "react";
import Header from './Header';
import Navigation from './Navigation';
import '../../css/Public.css'
import { Outlet } from "react-router-dom";

const Topbar = () => {
    
    return (
        <>
            <div className="App public mb-0">

                <Header />
                <Navigation />
            </div>
            <Outlet />
        </>
        
    );
};

export default Topbar;