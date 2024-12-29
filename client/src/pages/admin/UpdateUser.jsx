import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../server-config";
import axios from "axios";
import Header from "../../component/admin/header";
import Sidebar from "../../component/admin/sidebar";
import Footer from "../../component/admin/footer";
import Input from "../../component/shared/input";
import FormatDate from "../../utils/formatDate";

function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Get user based on Id from server to show in form
      axios.get(`${apiUrl}/api/users/${id}`).then((res) => {
        setUser(res.data);
      }).catch(error => {
        console.log(error);
        navigate("/admin/users"); 
      });
    } catch (error) {
      console.log(error);
      navigate("/admin/users"); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.patch(`${apiUrl}/api/users/${id}`, user)
        .then((res) => {
          console.log(res);
          // Show an alert when the update is successful
          alert("User updated successfully!");
          navigate("/admin/users"); 
        })
        .catch((err) => {
          console.error("Error updating user: ", err);
          alert("Failed to update user: " + err.message);
        });
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("An unexpected error occurred: " + error.message);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
              {!user ? (
                <div>Loading...</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Input
                        name="email"
                        type="email"
                        label="Email Address"
                        isReadOnly={true}
                        isDisable={true}
                        placeholder="Sample: yourname@outlook.com"
                        value={user.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Input
                        name="firstName"
                        type="text"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={user.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        name="lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={user.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Input
                        name="phoneNumber"
                        type="text"
                        label="Contact Number"
                        placeholder="e.g +1(234)567-8965"
                        value={user.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        name="birthDate"
                        type="date"
                        label="Birth Date"
                        placeholder="mm/dd/yyyy"
                        value={FormatDate(user.birthDate)}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col col-md-2">
                      <Link to="/admin/users">
                        <button className="btn btn-secondary">
                          Back to List
                        </button>
                      </Link>
                    </div>
                    <div className="col col-md-2 text-end">
                      <button className="btn btn-success">Update</button>
                    </div>
                  </div>
                </form>
              )}
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

export default UpdateUser;
