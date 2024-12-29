import React, { useState } from "react";
import SalesReport from "../Staff/Reports/SalesReport";
import InventoryReport from "../Staff/Reports/InventoryReport";
import ProductReport from "../Staff/Reports/ProductReport";
import FormatDate from "../../utils/formatDate";

const StaffReport = () => {
  const [startDate, setStartDate] = useState(FormatDate(new Date().setMonth(new Date().getMonth() - 3)));
  const [endDate, setEndDate] = useState(FormatDate(new Date()));
  const [tab, setTab] = useState(1);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-auto">
          <label htmlFor="start-date">From Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            className="form-control"
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="end-date">To Date</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            className="form-control"
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={()=> setTab(1)}
            >
              Sales
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              onClick={()=> setTab(2)}
            >
              Inventory
            </button>
            <button
              className="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
              onClick={()=> setTab(3)}
            >
              Products
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabIndex="0"
          >
           { tab === 1 && <SalesReport startDate={startDate} endDate={endDate} />}
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabIndex="0"
          >
           {tab === 2 && <InventoryReport />}
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabIndex="0"
          >
            {tab === 3 && <ProductReport startDate={startDate} endDate={endDate} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StaffReport;
