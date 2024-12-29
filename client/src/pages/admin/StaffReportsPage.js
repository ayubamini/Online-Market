import React from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import StaffReport from "../../component/admin/StaffReport";
import Footer from "../../component/admin/footer";

const StaffReportsPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <Sidebar activeItem={1} />
        </div>
        <div className="col-sm-12 col-md-9">
          <div className="card">
            <div className="card-body">
              <StaffReport />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StaffReportsPage;
