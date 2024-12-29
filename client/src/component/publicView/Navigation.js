import React, { useEffect, useState } from 'react';
import { FaBars, FaArrowDown, FaUser, FaAngleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../../server-config'

const Navigation = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('userId');

    useEffect(() => {

        fetch(`${apiUrl}/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch((err) => console.log(err));

    }, [])

    const chooseCategory = (cat) => {
        navigate(`/productlist?category=${cat}`)
    }

    const toggleSubCategory = (elementId) => {
        let element = document.getElementById(elementId);
        let childDropdown = element.children[0];
        if (element.classList.contains('show')) {

            element.classList.remove('show');
            childDropdown.classList.remove('show');
            childDropdown.removeAttribute('data-bs-popper');
            setShowCategories(false);
        }

        else {

            element.classList.add('show');
            childDropdown.classList.add('show');
            childDropdown.setAttribute('data-bs-popper', 'static');
            setShowCategories(true);
        }

    }

    return (
        <nav className="navigation">
            {/* Category Menu */}
            <div className="dropdown categories-dropdown">
                <button className="btn categories-dropbtn" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    {showCategories ? <FaArrowDown /> : <FaBars />}
                    Category
                </button>
                <ul className="dropdown-menu px-2 py-3 border-custom-primary border-5 border-0 border-top rounded-0">
                    {categories.map((parent) =>
                        <li className='dropend' key={parent.ParentCategory}>
                            <button className="dropdown-item"
                                id={`dropdown-${parent.ParentCategory}`}
                                onMouseEnter={() => toggleSubCategory(`dropdown-${parent.ParentCategory}`)}
                                onMouseLeave={() => toggleSubCategory(`dropdown-${parent.ParentCategory}`)}>
                                {parent.ParentCategory}
                                <ul className="dropdown-menu">
                                    {parent.categories.map((category) => <li key={category}>
                                        <button className="dropdown-item" onClick={() => chooseCategory(category)}>{category}</button>
                                    </li>
                                    )}
                                </ul>
                            </button>
                        </li>)}
                </ul>
            </div>

            {/* Account Menu */}
            {isLoggedIn && <div className="account-dropdown">
                <button className="account-dropbtn">
                    My Account <FaAngleDown />
                </button>
                <div className="account-dropdown-content">
                    <div className="user-icon">
                        <FaUser />
                    </div>
                    <Link to="/myaccount">My Account</Link>
                    <Link to="/myaccount/orderhistory">My Orders</Link>
                    {/* <Link to="/myaccount/changepw">Change Password</Link> */}
                </div>
            </div>}
        </nav>
    );
};

export default Navigation;