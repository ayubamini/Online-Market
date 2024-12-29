import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiUrl } from '../server-config';

const ProductList = ({ handleClickProduct }) => {
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [sort, setSort] = useState("1");

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    // Get the current items based on pagination
    const currentItems = products.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePreviousClick = () => {
        setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    };

    const handleNextClick = () => {
        setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const renderPagination = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a onClick={() => handlePageClick(i)} className="page-link" href="#">{i}</a>
                </li>
            );
        }
        return pages;
    };

    useEffect(() => {

        const fetchProducts = async () => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('sort', sort)

            const url = new URL(`${apiUrl}/api/products`)
            url.search = searchParams

            try {
                const response = await fetch(url);  // Use the apiUrl from server-config
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Update the state with the fetched products
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchProducts(); // Execute the fetch operation
    }, [location, sort]); // Empty dependency array means this effect will only run once, after initial render

    return (
        <div className="card m-3 border-0">
            <div className="card-body">
                <div className="row justify-content-end mb-4 align-items-center">
                    {/***                 <div className="col-12 col-md-8">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        />
                    </div>*/}
                    <div className="col-12 col-md-auto">
                        <label htmlFor='price-range'>Sort by:</label>
                    </div>
                    <div className="col-12 col-md-auto">
                        <select className="form-select" id="order-status"
                            value={sort}
                            onChange={e => setSort(e.target.value)}>
                            <option value="1">A-Z</option>
                            <option value="2">Price (Low to High)</option>
                            <option value="3">Price (High to Low)</option>
                        </select>
                    </div>
                </div>
                {currentItems.length !== 0 && <>
                    <div className='row row-cols-1 row-cols-sm-4 row-cols-md-6'>
                        {currentItems.map((product) =>  // Use currentItems here instead of products
                            <div className='col m-2' key={product._id}>
                                <div className="card border-0">
                                    <button className="btn" onClick={e => handleClickProduct(product._id)}>
                                        <div className='product-thumbnail justify-content-center'>
                                            <img src={product.Picture && product.Picture.length > 0 ? product.Picture[0] : undefined} className="card-img-top" alt={product.ProductName} />
                                        </div>
                                    </button>
                                    <div className="card-body">
                                        <p className="card-title">{product.ProductName}</p>
                                        {product.DiscountPrice ?
                                            <>
                                                <p className="card-text text-danger fw-bold d-inline me-3">${product.DiscountPrice.toFixed(2)}</p>
                                                <p className="card-text d-inline text-decoration-line-through">${product.ProductPrice.toFixed(2)}</p>
                                            </> :
                                            <p className="card-text">${product.ProductPrice.toFixed(2)}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex justify-content-end'>
                        <nav className='border-0'>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a onClick={handlePreviousClick} className="page-link" href="#">Previous</a>
                                </li>
                                {renderPagination()}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a onClick={handleNextClick} className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
                }
                {currentItems.length === 0 && <p>No items found.</p>}
            </div>
        </div>
    );
}

export default ProductList;