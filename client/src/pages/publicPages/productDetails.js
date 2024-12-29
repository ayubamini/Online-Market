import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from '../../server-config';
import { useCart } from "../../component/CartContext";

const ProductDetails = ({ authenticated }) => {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name);
    const [product, setProduct] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const { addToCart } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

    const navigate = useNavigate();

    useEffect(() => {

        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/product?id=${decodedName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch details for ${decodedName}`);
                }
                const data = await response.json();
                if (data) {
                    setProduct(data);
                    setPreviewImage(data.Picture && data.Picture.length > 0 ? data.Picture[0] : 'path/to/default/image.jpg');
                }
            } catch (error) {
                navigate('/error');
            }
        };

        fetchProductDetails();
    }, [decodedName, navigate]);


    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(product);
            alert("Product has been added to your cart!");
        } else {
            alert("Please log in to add items to your cart.");
        }
    };

    const handleBuyNow = () => {
        if (isLoggedIn) {
            addToCart(product);
            navigate('/shoppingcart');
        } else {
            alert("Please log in to buy items.");
        }
    };

    const clickImage = (e) => {
        setPreviewImage(e.target.src);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container text-start'>
            <div className='row justify-content-between'>
                <div className='col-auto'>
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/productlist')}>{'<< Back'}</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='row justify-content-center'>
                        <img src={previewImage} alt='preview' className="w-50" />
                    </div>
                    <div className='row row-cols-1 row-cols-md-4 justify-content-start gx-5'>
                        {product.Picture && product.Picture.map((source, index) =>
                            <div className='col m-2' key={index}>
                                <button type='button' className='btn p-0 m-0 position-relative' onClick={clickImage}>
                                    <img src={source} alt={product.ProductName || 'Product'} className="card-img-top" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-6'>
                    <div className='row mb-3 gx-0 fs-3 fw-bold'>
                        {product.ProductName || "No product name available"}
                    </div>
                    {/**          
                     * <div className='row mb-3 gx-0 text-secondary'>
                        {product.ProductBrand || "No brand available"}
                    </div>*/}
                    <hr />
                    <div className='row mb-3 gx-0'>
                        <label htmlFor='product-description'>Description</label>
                        {product.ProductDescription || "No description available"}
                    </div>
                    <div className='row mb-3 gx-0 fs-3'>
                        {product.DiscountPrice ?
                            <div>
                                <p className="text-danger fw-bold d-inline me-3">${product.DiscountPrice.toFixed(2)}</p>
                                <p className="fs-5 text-decoration-line-through d-inline">${product.ProductPrice.toFixed(2)}</p>
                            </div> :
                            <>${product.ProductPrice ? product.ProductPrice.toFixed(2) : "N/A"}</>
                        }

                    </div>
                    <div className="row mt-5">
                        <div className="col-auto mx-3">
                            <button className='btn btn-outline-custom-primary' onClick={handleAddToCart}>
                                ADD TO CART
                            </button>                        </div>
                        <div className="col-auto">
                            <button className='btn btn-custom-primary' onClick={handleBuyNow}>BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
