import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from './Helpers/pagination'
import { apiUrl } from '../../server-config'

const TodayPickupOrders = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const recordPerPage = 10;
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    const changePage = newPage => {
        setPage(newPage)
    }

    useEffect(() => {

        fetch(`${apiUrl}/api/orders/todayorders?page=${page}&limit=${recordPerPage}`,
            {
                headers: {
                    "authorization": localStorage.getItem('token'),
                }
            })
            .then((res) => {
                if (res.ok)
                    return res.json();
                else navigate('/*');
            }
            )
            .then(res => {

                setOrderCount(res['count'])
                setOrders(res['data'])
            })
            .catch(err => {
                console.log(err)
                navigate('/*')
            });

    }, [page, navigate])

    return (
        <div className='container'>
            <h4 className='text-start mb-3'>Today's Pickup Orders</h4>
            <div className='table-responsive'>
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Order#</th>
                            <th>Status</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>
                            <tr>
                                <td><Link to={`/staff/orders/${order.orderNo}`}>{order.orderNo}</Link></td>
                                <td>{order.Status}</td>
                                <td>
                                    <div>{order.CustomerName}</div>
                                    <div>{order['Contact#']}</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {orders.length === 0 && <div>No orders found.</div>}
                </table>
            </div>
            <div className='d-flex justify-content-end'>
                {
                    orderCount > 0 &&
                    <Pagination itemsCount={orderCount} pageSize={recordPerPage} currentPage={page} onPageChange={changePage} />
                }
            </div>
        </div>
    )
}

export default TodayPickupOrders