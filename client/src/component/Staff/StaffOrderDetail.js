import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { alert } from '../../utils/alert';
import { apiUrl } from '../../server-config'

const StaffOrderDetail = () => {

    const [order, setOrder] = useState({});
    const orderNo = useParams().orderId;
    const navigation = useNavigate();

    useEffect(() => {
        fetch(`${apiUrl}/api/orders/order?orderNo=${orderNo}`, {
            headers: {
                "authorization": localStorage.getItem('token'),
            }
        })
            .then((res) => {
                if (!res.ok)
                    navigation('/*');
                return res.json()
            })
            .then(data => {
                if (data.orderDate)
                    data.orderDate = data.orderDate.slice(0, 10);
                if (data.PickupDateTime)
                    data.PickupDateTime = `${data.PickupDateTime.slice(0, 10)} ${data.PickupDateTime.slice(11, 16)}`;

                if (data.Products)
                    data.Products = data.Products.map((product) => {
                        if (product.picture)
                            product.picture = product.picture[0]
                        return product;
                    })
                setOrder(data);
            }

            )
            .catch(err => {
                console.log(err)
            }
            );

    }, [orderNo, navigation])

    const updateStatus = () => {

        const body = {
            _id: order._id,
            Status: order.Status
        }

        fetch(`${apiUrl}/api/orders/updateStatus`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (res.ok)
                    alert('success', `Order ${orderNo} has been updated successfully.`);
                else
                    alert('warning', res.status);
            })
            .catch(() => alert('danger', 'Something went wrong!'))
    }

    return (
        <div className='container text-start'>
            <div className='row'>
                <Link to='/staff/orders'>{'<<Back'}</Link>
            </div>
            <div className='row'>
                <h4>Order # - {order.orderNo}</h4>
            </div>
            <hr />
            <div className='row mb-4'>
                <div className='col-3'>Order Date</div>
                <div className='col-9'>{order.orderDate}</div>
            </div>
            <div className='row my-4'>
                <div className='col-3'>Customer Name</div>
                <div className='col-9'>{order.CustomerName}</div>
            </div>
            <div className='row my-4'>
                <div className='col-3'>Customer Contact</div>
                <div className='col-9'>{order['Contact#']}</div>
            </div>
            <div className='row my-4'>
                <div className='col-3'>Order Type</div>
                <div className='col-9'>{order.OrderType}</div>
            </div>

            {order.OrderType === "Delivery" && <div className='row my-4'>
                <div className='col-3'>Delivery Address</div>
                <div className='col-9'>
                    <div>
                        {order.DeliveryAddress}
                    </div>
                </div>
            </div>}

            {order.OrderType === "Pickup" && <div className='row my-4'>
                <div className='col-3'>Pickup Date</div>
                <div className='col-9'>
                    <div>
                        {order.PickupDateTime}
                    </div>
                </div>
            </div>}

            <div className='row my-4'>
                <div className='col-3'>Status</div>
                <div className='col-3'>
                    <select className="form-select" aria-label="Default select example" value={order.Status}
                        onChange={(e) => setOrder({ ...order, Status: e.target.value })}>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className='col-3'>
                    <button className='btn btn-success align-self-end' onClick={() => updateStatus()}>Save</button>
                </div>
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
                    {order.Products && <tbody className='py-3'>
                        {order.Products.map((product, index) =>
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={product.Picture} alt='Logo' width="30" height="24" className="d-inline-block align-text-top mx-3" />
                                    {product.ProductName}
                                </td>
                                <td>
                                    ${product.ProductPrice}
                                </td>
                                <td>
                                    {product.Quantity}
                                </td>
                            </tr>)}
                    </tbody>}
                </table>
            </div>
        </div>
    )
}

export default StaffOrderDetail