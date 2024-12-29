import React, { useState } from "react";
import LoginModal from "./LoginModal";
import { MdLanguage } from "react-icons/md";
import "../../css/Public.css";

const TopRightBar = () => {
  const [language, setLanguage] = React.useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false); // for login modal

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleAccountInfoClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = (d) => {
    if(!d){
        return;
    }

    console.log(d);
    setIsLoggedIn(true);
    setUsername(d.firstName);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="p-2 row justify-content-end align-items-center w-100">
      <div className="row w-25">
        {/* Language */}
        <div className="col-8 row align-items-center">
          <div className="col-3 text-end">
            <MdLanguage size="1.5rem" />
          </div>
          <div className="col-9">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="form-select"
            >
              <option value="English">English</option>
              <option value="Français">Français</option>
            </select>
          </div>
        </div>
        {/* Login */}
        <div className="col-4">
          <div
            className="btn btn-custom-primary"
            onClick={handleAccountInfoClick}
          >
            {isLoggedIn ? `Hi, ${username}` : "Login"}
          </div>
        </div>
        {/* Modal */}
        {showModal && (
          <LoginModal
            onClose={(d) => {
              setShowModal(false);
              handleLogin(d);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TopRightBar;

