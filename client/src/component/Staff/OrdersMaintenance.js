import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './Helpers/pagination';
import { apiUrl } from '../../server-config'

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({
        orderNo: '',
        status: '',
        orderDate: ''
    })

    //Pagination
    const [page, setPage] = useState(1);
    const recordPerPage = 10;
    const [orderCount, setOrderCount] = useState(0);

    const clearFilter = () => {
        setFilter({
            orderNo: '',
            status: '',
            orderDate: ''
        });
        getOrders({});
    }

    const getOrders = ({ orderNo, status, orderDate }) => {

        let url = `${apiUrl}/api/orders?page=${page}&limit=${recordPerPage}`
        if (orderNo){
            url += `&orderNo=${orderNo}`
        }
            
        if (status)
            url += `&status=${status}`
        if (orderDate)
            url += `&orderDate=${orderDate}`

        fetch(url, {
            headers: {
                "authorization": localStorage.getItem('token'),
            }
        })
            .then((res) => {
                if (res.ok)
                    return res.json()
            }
            )
            .then(res => {
                setOrderCount(res['count'])
                const data = res['data'].map(e => {
                    e.orderDate = e.orderDate.slice(0, 10);
                    return e
                });
                setOrders(data)
            })
            .catch(err => {
                console.log(err)
            }
            );
    }

    const changePage = newPage => {
        setPage(newPage)
    }

    useEffect(() => {
        getOrders(filter);
    }, [page])



    return (
        <div>
            {/* Search */}
            <div className='container mb-4'>
                <div className="card border-0">
                    <h5 className="card-header text-start">Search</h5>
                    <div className="card-body">
                        <div className='card-text py-3'>
                            <form className='container text-start'>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <label htmlFor='order-number'>Order#</label>
                                        <input id='order-number' type='text' className='form-control'
                                            value={filter.orderNo}
                                            onChange={e => setFilter({ ...filter, orderNo: e.target.value })} />
                                    </div>
                                    <div className='col'>
                                        <label htmlFor='order-status'>Status</label>
                                        <select className="form-select" id="order-status"
                                            value={filter.status}
                                            onChange={e => setFilter({ ...filter, status: e.target.value })}>
                                            <option value="">--All--</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Ready for Pickup">Ready for Pickup</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <label htmlFor='order-date'>Order Date</label>
                                        <input type="date" id="order-date" className='form-control'
                                            value={filter.orderDate}
                                            onChange={e => setFilter({ ...filter, orderDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <button type='button' className='btn btn-success me-3'
                                            onClick={e => getOrders(filter)} >Search</button>
                                        <button type='button' className='btn btn-light'
                                            onClick={e => clearFilter()}>Clear</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className='table-responsive'>
                <table className="table table-striped table-hover ">
                    <thead className="table-light">
                        <tr>
                            <th>Order Date</th>
                            <th>Order #</th>
                            <th>Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>
                            <tr key={order['_id']}>
                                <td>{order.orderDate}</td>
                                <td><Link to={`/staff/orders/${order.orderNo}`}>{order.orderNo}</Link></td>
                                <td>
                                    <div>
                                        {order.CustomerName}
                                    </div>
                                    <div>
                                        {order.ContactNo}
                                    </div>
                                </td>
                                <td>{order.Status}</td>
                            </tr>
                        )}
                    </tbody>
                    {orders.length === 0 && <p>No orders found.</p>}
                </table>
            </div>
            {/* Pagination */}
            <div className='d-flex justify-content-end'>
                {
                    orderCount > 0 &&
                    <Pagination itemsCount={orderCount} pageSize={recordPerPage} currentPage={page} onPageChange={changePage} />
                }

            </div>
        </div>
    )
}

export default Orders