import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Helpers/pagination';
import { apiUrl } from '../../../server-config'

const InventoryReport = () => {

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [page, setPage] = useState(1);

    const [sort, setSort] = useState(1);
    const pageLimit = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${apiUrl}/api/report/inventoryReport?page=${page}&limit=${pageLimit}&sort=${sort}`, {
            headers: {
                "authorization": localStorage.getItem('token'),
            }
        })
            .then(res => res.json())
            .then(data => {

                setProducts(data.data);
                setProductCount(data.count);
            })
            .catch(err => alert(err));
    }, [page, navigate, sort])

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            <th><button className='bg-transparent border-0 fw-bold' onClick={e => setSort(1)}>Product Name</button></th>
                            <th>Category</th>
                            <th><button className='bg-transparent border-0 fw-bold' onClick={e => setSort(2)}>Remaining Inventory</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product) =>
                            <tr key={product._id}>
                                <td>
                                    <Link to={`/admin/products/${product._id}`}>{product.ProductName} </Link>
                                </td>
                                <td>{product.CategoryId}</td>
                                <td>{product.Quantity}</td>
                            </tr>
                        )}
                        {!products && <p>No items found.</p>}
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-end'>
                {
                    productCount > 0 &&
                    <Pagination itemsCount={productCount} pageSize={pageLimit} currentPage={page} onPageChange={setPage} />
                }

            </div>
        </>
    )
}

export default InventoryReport