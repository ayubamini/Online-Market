import React, { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isNotEmpty, isValidEmailFormat } from "./Validators";
import RoleContext from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../../server-config';

const PasswordInput = ({
  placeholder,
  password,
  setPassword,
  errorMessage,
  isConfirmPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const iconClassName = `password-toggle-icon ${showPassword ? "active" : ""}`;

  const handleChange = (e) => {
    if (isConfirmPassword) {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="form-input-container">
      <input
        type={showPassword ? "text" : "password"}
        value={isConfirmPassword ? confirmPassword : password}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input"
      />
      <i
        onClick={() => setShowPassword(!showPassword)}
        className={iconClassName}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </i>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

const AdminStaffLoginForm = ({
  role,
  email,
  password,
  setEmail,
  setPassword,
  emailError,
  passwordError,
  onLogin,
}) => (
  <div className={`${role}-login-form`}>
    <div className="form-input-container">
      <input
        type="email"
        placeholder={`${role} Email`}
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="error-message">{emailError}</div>}
    </div>
    <PasswordInput
      placeholder="Password"
      password={password}
      setPassword={setPassword}
      errorMessage={passwordError}
    />
    <div className="form-button-container">
      <button onClick={onLogin} className="form-button btn btn-primary">
        Login
      </button>
    </div>
  </div>
);

const LoginModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAdminStaffLogin, setIsAdminStaffLogin] = useState(false);
  const [adminStaffActiveTab, setAdminStaffActiveTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmpassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { authenticated, setAuthenticated } = useContext(RoleContext);
  const navigate = useNavigate();

  const validateSignUp = () => {
    let errors = {};
    let isValid = true;

    if (!isNotEmpty(firstName)) {
      errors.firstName = "*First Name is required";
      isValid = false;
    }
    if (!isNotEmpty(lastName)) {
      errors.lastName = "*Last Name is required";
      isValid = false;
    }
    if (!isNotEmpty(signUpEmail)) {
      errors.email = "*Email is required";
      isValid = false;
    } else if (!isValidEmailFormat(signUpEmail)) {
      errors.email = "*Invalid email format";
      isValid = false;
    }
    if (!isNotEmpty(signUpPassword)) {
      errors.password = "*Password is required";
      isValid = false;
    }
    if (!isNotEmpty(phoneNumber)) {
      errors.phone = "*Phone number is required";
      isValid = false;
    }

    if (!isNotEmpty(confirmPassword)) {
      errors.confirmPassword = "*Confirm Password is required";
      isValid = false;
    } else if (signUpPassword !== confirmPassword) {
      errors.confirmPassword = "*Passwords do not match";
      isValid = false;
    }

    setSignUpErrors(errors);
    return isValid;
  };

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validateSignUp()) {
      return;
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: signUpEmail,
      password: signUpPassword,
      phoneNumber: phoneNumber
    };

    fetch(`${apiUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.code === 11000) {
            // Handle duplicate email error
            setSignUpErrors((prevErrors) => ({
              ...prevErrors,
              email: "*Email is used",
            }));
          } else {
            // Handle other errors
            console.error("Signup error:", data.message);
          }
          return;
        }
        onClose(); // Close the modal or redirect the user
        alert("User registered successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again.");
      });
  };

  const validateEmail = () => {
    if (!isNotEmpty(email)) {
      setEmailError("*Email is required");
      return false;
    } else if (!isValidEmailFormat(email)) {
      setEmailError("*Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!isNotEmpty(password)) {
      setPasswordError("*Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e, isAdminStaff = false) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    if (isAdminStaff) {
      try {
        // Admin & Staff Login
        const userData = {
          email: email,
          password: password,
          isAdmin: adminStaffActiveTab === "admin" ? true : false,
        };

        await fetch(`${apiUrl}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              alert(
                `Status: ${response.status}, ${response.statusText} - Invalid email or address!`
              );
              //onClose();
            }
            return response.json();
          })
          .then((d) => {
            if (d.data) {
              const data = d.data;
              // Check the role (admin or staff) and redirect accordingly

              if (data.isAdmin === true && adminStaffActiveTab === "admin") {
                console.log(data.token);
                //setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data._id);
                setAuthenticated({ ...authenticated, isAdmin: true });
                navigate("/admin");
                //onClose(data);
              } else if (
                data.isStaff === true &&
                adminStaffActiveTab === "staff"
              ) {
                //setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data._id);
                setAuthenticated({ ...authenticated, isStaff: true });
                navigate("/staff");
                //onClose(data);
              } else {
                alert("Invalid User!");
              }
            } else {
              console.log(d);
            }
          });
      } catch (error) {
        //setToken(null);
        localStorage.removeItem("token");
        console.error("Error:", error);
      }
    } else {
      try {
        // Customer Login
        const userData = {
          email: email,
          password: password,
        };

        await fetch(`${apiUrl}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              alert(
                `Status: ${response.status}, ${response.statusText} - Invalid email or address!`
              );
            }
            return response.json();
          })
          .then((d) => {
            if (d.data) {
              const data = d.data;

              if (data.isAdmin === true) {
                alert("Use admin or staff login form!");
                return;
              }

              if (data) {
                //setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data._id);
                setAuthenticated({ ...authenticated, registered: true });
                onClose(data);
              }
            } else {
              console.log(d);
            }
          });
      } catch (error) {
        //setToken(null);
        localStorage.removeItem("token");
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === "modal") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const showForgotPassword = () => {
    setIsForgotPassword(true);
    setIsAdminStaffLogin(false);
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setIsAdminStaffLogin(false);
    setActiveTab("login");
  };

  const showAdminStaffLogin = () => {
    setIsAdminStaffLogin(true);
    setIsForgotPassword(false);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isForgotPassword && !isAdminStaffLogin ? (
          <>
            {/* Tab Header */}
            <div className="accountMenu-switchTab">
              <button
                className={
                  activeTab === "login"
                    ? "accountMenu-activeTitle"
                    : "accountMenu-title"
                }
                onClick={() => setActiveTab("login")}
              >
                Sign In
              </button>
              <button
                className={
                  activeTab === "signup"
                    ? "accountMenu-activeTitle"
                    : "accountMenu-title"
                }
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {/*Login*/}
            {activeTab === "login" && (
              <div className="login-form">
                {/* ... other input fields ... */}
                <div className="form-input-container">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-input"
                  />
                  {emailError && (
                    <div className="error-message">{emailError}</div>
                  )}
                </div>
                <PasswordInput
                  placeholder="Password"
                  password={password}
                  setPassword={setPassword}
                  errorMessage={passwordError}
                />
                <div className="additional-links">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showForgotPassword();
                    }}
                  >
                    Forgot Password?
                  </a>
                  <br />
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showAdminStaffLogin();
                    }}
                  >
                    Admin/Staff Login
                  </a>
                </div>
                <div className="form-button-container">
                  <button
                    className="form-button"
                    onClick={(e) => handleLogin(e, false)}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}

            {/*Sign Up*/}
            {activeTab === "signup" && (
              <div className="signup-form">
                {/* First Name */}
                <div className="form-input-container">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-input"
                  />
                  {signUpErrors.firstName && (
                    <div className="error-message">
                      {signUpErrors.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-input-container">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                  />
                  {signUpErrors.lastName && (
                    <div className="error-message">{signUpErrors.lastName}</div>
                  )}
                </div>

                {/* Email */}
                <div className="form-input-container">
                  <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="form-input"
                  />
                  {signUpErrors.email && (
                    <div className="error-message">{signUpErrors.email}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-input-container">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-input"
                  />
                  {signUpErrors.phone && (
                    <div className="error-message">{signUpErrors.phone}</div>
                  )}
                </div>

                {/* Password */}
                <PasswordInput
                  placeholder="Password"
                  password={signUpPassword}
                  setPassword={setSignUpPassword}
                  errorMessage={signUpErrors.password}
                />

                {/* Confirm Password */}
                <PasswordInput
                  placeholder="Confirm Password"
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  errorMessage={signUpErrors.confirmPassword}
                  isConfirmPassword={true}
                />

                <div className="form-button-container">
                  <button
                    type="button"
                    className="form-button"
                    onClick={(e) => handleSignUp(e)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </>
        ) : isAdminStaffLogin ? (
          // Admin&Staff Login Form
          <div className="admin-staff-login-form">
            <div className="accountMenu-switchTab">
              <button
                className={
                  adminStaffActiveTab === "admin"
                    ? "accountMenu-activeTitle"
                    : "accountMenu-title"
                }
                onClick={() => setAdminStaffActiveTab("admin")}
              >
                Admin
              </button>
              <button
                className={
                  adminStaffActiveTab === "staff"
                    ? "accountMenu-activeTitle"
                    : "accountMenu-title"
                }
                onClick={() => setAdminStaffActiveTab("staff")}
              >
                Staff
              </button>
            </div>

            {adminStaffActiveTab === "admin" && (
              <AdminStaffLoginForm
                role="Admin"
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                emailError={emailError}
                passwordError={passwordError}
                onLogin={(e) => handleLogin(e, true)}
              />
            )}

            {adminStaffActiveTab === "staff" && (
              <AdminStaffLoginForm
                role="Staff"
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                emailError={emailError}
                passwordError={passwordError}
                onLogin={(e) => handleLogin(e, true)}
              />
            )}

            <div className="back-to-login-link">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  backToLogin();
                }}
              >
                Back to User Login
              </a>
            </div>
          </div>
        ) : (
          //Forgot Password Form
          <div className="forgot-password-form">
            <p>
              <h2>Forgot Password</h2>
              Enter the email you used to register and we'll send you a link to
              reset your password.
            </p>
            <div className="form-input-container">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-button-container">
              <button
                className="form-button"
                onClick={() => {
                  /* handle forgot password logic,update later */
                }}
              >
                Send
              </button>
            </div>
            <div className="back-to-login-link">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  backToLogin();
                }}
              >
                Back to Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
