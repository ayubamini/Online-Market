import React from 'react'
import { useCart } from './CartContext'
import { Link } from 'react-router-dom';

const ShoppingCartItem = ({ product }) => {
    const { addToCart, removeFromCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product);
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-sm-3'>
                    <Link to={`/productlist/${encodeURIComponent(product.ProductName)}`}>
                        <img src={product.Picture[0]} alt={product.ProductName} className='product-thumbnail' />
                    </Link>

                </div>
                <div className='col-12 col-sm-4'>
                    <div className='row mb-2'>
                        {product.ProductName}
                    </div>
                    <div className='row'>
                        ${product.ProductPrice} each
                    </div>
                </div>
                <div className='col-12 col-sm-3'>
                    <button className='rounded-circle border border-custom-primary bg-light-subtle text-custom-primary me-3 p-1 px-2' onClick={handleRemoveFromCart}>
                        {product.Quantity === 1 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>}
                    </button>
                    {product.Quantity}
                    <button className='rounded-circle border border-custom-primary bg-light-subtle text-custom-primary ms-3 p-1 px-2' onClick={handleAddToCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>
                    </button>
                </div>
                <div className='col-12 col-sm-2'>
                    <div className='row justify-content-center'>
                        ${Math.round((product.ProductPrice * product.Quantity + Number.EPSILON) * 100) / 100}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem