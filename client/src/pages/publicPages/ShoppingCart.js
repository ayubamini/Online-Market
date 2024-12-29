import React from 'react'
import CartSummary from '../../component/CartSummary'
import ShoppingCartItem from '../../component/ShoppingCartItem'
import { useCart } from '../../component/CartContext'

const ShoppingCart = () => {
    const { cartItems, removeFromCart, emptyCart } = useCart();

    // Function to handle removing an item from the cart
    const handleRemoveItem = (productName) => {
        removeFromCart(productName);
    };

    // Function to handle emptying the entire cart
    const handleEmptyCart = () => {
        emptyCart();
    };

    return (
        <div className='container public mb-5'>
            <div className='row'>
                <div className='col-12 col-md-8'>
                    <div className='fs-4'>My Cart ({cartItems.length} Items)</div>
                    <hr />
                    {cartItems.map((product) => (
                        <ShoppingCartItem 
                            key={product.ProductName} 
                            product={product} 
                            onRemoveItem={() => handleRemoveItem(product.ProductName)}
                        />
                    ))}
                    <hr />
                    <div className='row justify-content-end'>
                        <button className='col-12 col-md-auto btn btn-outline-secondary' onClick={handleEmptyCart}>
                            Empty Cart
                        </button>
                    </div>
                </div>
                <div className='col-12 col-md-4'>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;