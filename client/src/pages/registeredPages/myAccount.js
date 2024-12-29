import React, { useEffect, useState } from "react";
import MyAccountNavBar from "../../component/MyAccountNavBar";
import Input from "../../component/shared/input";
import axios from "axios";
import AddressInput from "../../component/shared/addressInput";
import { apiUrl } from '../../server-config';
import FormatDate from '../../utils/formatDate';

const MyAccount = () => {
  const user_id = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    address: [{ addressLine: "", city: "", state: "", zip: "" }],
  });

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/api/users/${user_id}`
      )
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  }, formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .patch(
          `${apiUrl}/api/users/${user_id}`,
          formData
        )
        .then((res) => {
          setFormData(res.data);
          alert("Your changes have been saved successfully!");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (newAddress) => {
    setFormData({ ...formData, address: newAddress });
  };

  return (
    <div className="container w-50">
      <MyAccountNavBar active={2} />

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active mt-5 mb-3"
          id="nav-account"
          role="tabpanel"
          aria-labelledby="nav-account-tab"
          tabIndex="0"
        >
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-4">
                <Input
                  name="email"
                  type="text"
                  label="Email"
                  isReadOnly={true}
                  isDisable={true}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  name="firstName"
                  type="text"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <Input
                  name="birthDate"
                  type="Date"
                  label="Birth Date"
                  value={FormatDate(formData.birthDate)}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <Input
                  name="phoneNumber"
                  type="text"
                  label="phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              {/*
              <br />
              <h5>Address Information</h5>
              <div className="col-12">
                <AddressInput
                  value={formData.address}
                  onAddressChange={handleAddressChange}
                />
              </div>*/}
              <br />
              <div className="col-12">
                <span className="float-end">
                  <button type="submit" className="btn btn-custom-primary">
                    Save Changes
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
