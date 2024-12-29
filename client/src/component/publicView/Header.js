import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { logo } from "../../image";
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from "./LoginModal";
import "../../css/Public.css";
import { logout } from "../../utils/auth";
import RoleContext from "../../context/RoleContext";
import { useCart } from '../CartContext';

const Header = () => {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false); // for login modal
    const { setAuthenticated } = useContext(RoleContext);
    const navigate = useNavigate();
    const { cartItems } = useCart(); // Access cart items


    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId)
            setIsLoggedIn(true);
    }, [])

    const handleSearchSubmit = (event) => {
        //   event.preventDefault();
        if (searchTerm.trim() !== '') {
            // Redirect to product list page with search query as URL parameter
            navigate(`/productlist?Name=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleAccountInfoClick = () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            setShowModal(true);
        }
    };

    const handleLogin = (d) => {
        if (!d) {
            return;
        }
        setIsLoggedIn(true);
    };

    const handleLogout = () => {

        logout(setAuthenticated);
        setIsLoggedIn(false);
        navigate("/")

    };

    const itemCount = cartItems.reduce((total, item) => total + item.Quantity, 0);
    const totalCost = cartItems.reduce((total, item) => total + item.ProductPrice * item.Quantity, 0);

    return (
        <header className='row py-2'>
            {/* Logo */}
            <div className="col-12 col-sm-2 logo">
                <Link to="/"><img src={logo} alt="Logo" className='ps-4' /></Link>
            </div>

            {/* Search bar */}
            <div className='col-12 col-sm-7'>
                <div className="input-group">
                    <input type="text" className="form-control py-2 rounded-0" placeholder="Search in products..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="btn pb-2 rounded-0 border" type="button" id="button-addon2"
                        onClick={handleSearchSubmit}
                    >
                        <FaSearch className="search-icon" />
                    </button>
                </div>
            </div>

            {/* Conditionally display the shopping cart only when logged in */}
            {isLoggedIn && (
                <div className='col-12 col-sm-1 shopping-cart-container d-flex justify-content-start'>
                    <Link to="/shoppingCart" className="row text-decoration-none text-dark align-items-center">
                        <div className='col-6'>
                            <button className="btn bg-custom-light p-3 rounded-circle position-relative">
                                <FaShoppingCart />
                                <span className="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-custom-primary">
                                    {itemCount}
                                </span>
                            </button>
                        </div>
                        <div className='cart-total-cost col-6'><span>${totalCost.toFixed(2)}</span></div>
                    </Link>
                </div>
            )}

            <div className='col-12 col-sm-1 text-start'>
                <div
                    className="btn btn-custom-primary"
                    onClick={handleAccountInfoClick}
                >
                    {isLoggedIn ? 'Logout' : "Login"}
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
        </header>
    );
};

export default Header;