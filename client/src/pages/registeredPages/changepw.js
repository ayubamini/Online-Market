import React from "react";
import { Link } from "react-router-dom";
import MyAccountNavBar from "../../component/MyAccountNavBar";

const ChangePw = () => {
  return (
    <div className="container w-50">
      <MyAccountNavBar active={3} />

      <form className="container w-75">
        <div className="ps-3 fs-5 row mt-5">Change password</div>

        <div className="row justify-content-center">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4 text-end">
              <label for="currentpw" className="col-form-label">
                Current password:
              </label>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="password"
                id="currentpw"
                name="currentpw"
                className="form-control"
              />
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4 text-end">
              <label for="newpw" className="col-form-label">
                New password:
              </label>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="password"
                id="newpw"
                name="newpw"
                className="form-control"
              />
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4 text-end">
              <label for="confirmpw" className="col-form-label">
                Repeat new password:
              </label>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="password"
                id="confirmpw"
                name="confirmpw"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row mt-5 text-end">
          <span className="float-end">
            <button className="btn btn-custom-primary">Change Password</button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePw;
