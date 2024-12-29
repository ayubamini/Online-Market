import React from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import Products from "../../component/admin/ProductsMaintenance";
import Footer from "../../component/admin/footer";

const ProductsMaintenancePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <Sidebar activeItem={3} />
        </div>
        <div className="col-sm-12 col-md-9">
          <div class="card">
            <div class="card-body">
              <h3>Products</h3>
              <Products />
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

export default ProductsMaintenancePage;
