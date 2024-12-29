import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, Colors
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Pagination from '../Helpers/pagination';
import { apiUrl } from '../../../server-config'

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const ProductReport = ({ startDate, endDate }) => {

    const [products, setProducts] = useState([]);
    const [chartData, setChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    //Pagination
    const [page, setPage] = useState(1);
    const recordPerPage = 10;
    const [productCount, setProductCount] = useState(0);

    const changePage = (pageNum) => {
        setPage(pageNum);

        const startRecord = (pageNum - 1) * recordPerPage;

        setTableData(products.slice(startRecord, startRecord + recordPerPage));
    }

    useEffect(() => {
        if (startDate && endDate) {
            fetch(`${apiUrl}/api/report/productReport?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    "authorization": localStorage.getItem('token'),
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setProductCount(data.length);
                    setChartData({
                        labels: data.slice(0, 10).map((e) => e.ProductName),
                        datasets: [
                            {
                                label: 'Sales',
                                data: data.slice(0, 10).map(e => e.Sales),
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 206, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(153, 102, 255)',
                                    'rgb(255, 159, 64)',
                                    'rgb(53,104, 99)',
                                    'rgb(229, 149, 90)',
                                    'rgb(86, 167, 44)',
                                    'rgb(202, 190, 80)'
                                ]
                            }
                        ],
                    });
                    setTableData(data.slice(0, 10));
                })
                .catch(err => alert(err));
        }

    }, [startDate, endDate])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
            title: {
                display: true,
                text: 'Top 10 best selling products',
                font: {
                    size: 20,
                    weight: 'normal'
                }
            },
            colors: {
                enabled: true
            }
        },
    }

    return (
        <div className='container'>
            {Object.keys(chartData).length !== 0 &&
                <div className='col-12 col-md-6 mx-auto p-2'>
                    <Pie options={options} data={chartData} />
                </div>
            }

            <div className='row mb-3 h4 fw-bold'>
                Sales by Products
            </div>
            <div className='col-12'>
                <div className="table-responsive">
                    <table className="table table-hover table-striped-columns">
                        <thead className="table-light">
                            <tr>
                                <th>Product Name</th>
                                <th>Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((product) =>
                                <tr key={product._id}>
                                    <td>{product.ProductName}</td>
                                    <td>${product.Sales}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='d-flex justify-content-end'>
                {
                    productCount > 0 &&
                    <Pagination itemsCount={productCount} pageSize={recordPerPage} currentPage={page} onPageChange={changePage} />
                }

            </div>
        </div>
    )
}

export default ProductReport