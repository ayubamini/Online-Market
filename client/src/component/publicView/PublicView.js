import React from "react";
import Header from './Header';
import Navigation from './Navigation';
import TopRightBar from './TopRightBar';
import Footer from './Footer';
import Banner from './Banner';
import '../../css/Public.css'

const PublicView = () => {
    
    return (
        <div className="App">
        <TopRightBar />
        <Header />
        <Navigation />
        <Banner />
        <Footer />
      </div>
    );
};

export default PublicView;
