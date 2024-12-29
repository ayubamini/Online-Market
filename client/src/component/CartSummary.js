import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../component/CartContext'; 

const CartSummary = () => {
    const { cartItems } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + item.ProductPrice * item.Quantity, 0);

    const deliveryFee = cartItems.length > 0 ? 1.49 : 0; // Set delivery fee to $1.49 if there are items, otherwise $0
    const taxRate = 0.13; 
    const taxAmount = (subtotal + deliveryFee) * taxRate;
    const total = subtotal + deliveryFee + taxAmount;

    return (
        <div className="card">
            <div className="card-header">
                Cart Summary
            </div>
            <div className="container card-body">
                <div className='row'>
                    <div className='col-md-8'>Subtotal:</div>
                    <div className='col-md-4'>${subtotal.toFixed(2)}</div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>Delivery fee:</div>
                    <div className='col-md-4'>${deliveryFee.toFixed(2)}</div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>HST:</div>
                    <div className='col-md-4'>${taxAmount.toFixed(2)}</div>
                </div>
                <div className='row mt-3 fw-bold'>
                    <div className='col-md-8'>Est. Total:</div>
                    <div className='col-md-4'>${total.toFixed(2)}</div>
                </div>
            </div>
            <Link to='/checkout' className='btn btn-custom-primary'>Proceed to Checkout</Link>
        </div>
    );
}

export default CartSummary;
