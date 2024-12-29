import React from "react";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import ProductDetail from "../../component/admin/ProductDetail";
import Footer from "../../component/admin/footer";

const ProductDetailPage = () => {
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
              <h3>Product Detail</h3>
              <ProductDetail />
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

export default ProductDetailPage;
