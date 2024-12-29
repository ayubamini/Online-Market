import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiUrl } from "../../server-config";

const OrderDetail = () => {
    const { orderNo } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productImages, setProductImages] = useState({});

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/orders/${orderNo}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch order details: ${response.statusText}`);
                }
                const data = await response.json();
                setOrder(data);
                fetchProductImages(data.Products);
            } catch (err) {
                setError(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderNo]);

    const fetchProductImages = async (products) => {
        const imageMap = {};
        await Promise.all(products.map(async (product) => {
            const response = await fetch(`${apiUrl}/api/products/${encodeURIComponent(product.ProductName)}`);
            const data = await response.json();
            if (data.length > 0 && data[0].Picture && data[0].Picture.length > 0) {
                imageMap[product.ProductName] = data[0].Picture[0];
            } else {
                imageMap[product.ProductName] = 'path_to_default_image.jpg';
            }
        }));
        setProductImages(imageMap);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!order) return <div>No order found.</div>;

    return (
        <div className='container text-start'>
            <div className='row justify-content-between'>
                <div className='col-auto col-md-9'>
                    <h4>Order # - {order.orderNo} <span className="badge text-bg-secondary">{order.Status}</span></h4>
                </div>
                <div className='col-auto col-md-3 text-end'>
                    <Link to='/myaccount/orderhistory'>Return to Order History</Link>
                </div>
            </div>
            <hr />
            <div className='row mb-2'>
                <div className='col-3'>Order Date</div>
                <div className='col-9'>{order.orderDate}</div>
            </div>
            <div className='row my-2'>
                <div className='col-3'>Order Type</div>
                <div className='col-9'>{order.OrderType}</div>
            </div>
            <div className='row my-2'>
                <div className='col-3'>{order.OrderType === 'Delivery' ? 'Delivery Address' : 'Pickup Date and Time'}</div>
                <div className='col-9'>{order.OrderType === 'Delivery' ? `${order.DeliveryAddress.Address1}, ${order.DeliveryAddress.City}, ${order.DeliveryAddress.State} ${order.DeliveryAddress.ZIP}` : order.PickupDateTime}</div>
            </div>
            <hr />
            <div className='table-responsive'>
                <table className="table table-striped table-hover text-start">
                    <thead className="table-light">
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Product</th>
                            <th scope='col'>Unit Price</th>
                            <th scope='col'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.Products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={productImages[product.ProductName]} alt={product.ProductName} width="30" height="24" />
                                    {product.ProductName}
                                </td>
                                <td>${product.ProductPrice.toFixed(2)}</td>
                                <td>{product.Quantity}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td className='fw-bold text-end'>Total:</td>
                            <td colSpan="2">${order.Products.reduce((acc, product) => acc + (product.ProductPrice * product.Quantity), 0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
