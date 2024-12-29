import React from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import Categories from "../../component/admin/Categories";
import Footer from "../../component/admin/footer";

const CategoryMaintenancePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <Sidebar activeItem={2} />
        </div>
        <div className="col-sm-12 col-md-9">
          <div class="card">
            <div class="card-body">
              <h3>Categories</h3>
              <Categories />
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

export default CategoryMaintenancePage;
