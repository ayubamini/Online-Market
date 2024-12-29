import React, { useState, useEffect } from "react";
import Input from "../../component/shared/input";
import TextAreaInput from "../../component/shared/textAreaInput";
import { contact } from "../../image";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //await axios.post('/api/send-email', formData);
      setAlert({
        type: "success",
        message: "Message sent successfully.",
      });
      setFormData({
        fullname: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setAlert({
        type: "danger",
        message: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <div className="container">
      <div className="">
        <div className="ps-3 fs-3 mt-5 text-center">CONTACT US</div>
        <br />
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="row">
              <div className="col-12">
                <img src={contact} alt="Contact Us" className="rounded img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            {alert && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                <strong>{alert.type}!</strong> {alert.message}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-12">
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    label="Email Address *"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Input
                    name="fullname"
                    id="fullname"
                    type="text"
                    label="Full Name *"
                    placeholder="Your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Input
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    label="Contact Number"
                    placeholder="Your mobile number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <Input
                    name="subject"
                    id="subject"
                    type="text"
                    label="Subject"
                    placeholder="Message subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <TextAreaInput
                    id="message"
                    name="message"
                    label="Body *"
                    placeholder="Your message here ..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-custom-primary"
                disabled={
                  formData.email === "" ||
                  formData.fullname === "" ||
                  formData.message === ""
                }
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
