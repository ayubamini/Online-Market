//import * as React from "react";
import React, { useContext } from "react"; 
import { Link, Navigate } from "react-router-dom";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import Users from "../../component/admin/users";
import Footer from "../../component/admin/footer";
import { AuthContext } from "../../context/AuthContext";


function UsersAccounts() {
  //const { token, loading } = useContext(AuthContext);
  // if (loading) {
  //   return null;
  // }

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // console.log(token);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <Sidebar activeItem={4} />
        </div>
        <div className="col-sm-12 col-md-9">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h3>Users Accounts</h3>
                </div>
                <div className="col-6">
                  <Link to="/admin/add">
                    <button
                      type="button"
                      style={{ float: "right", width: "100px" }}
                      className="btn btn-success mb-3"
                    >
                      Add User
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Users />
                </div>
              </div>
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
}

export default UsersAccounts;
