import React from 'react'
import StaffMenu from '../../component/Staff/StaffMenu';
import StaffHeader from '../../component/Staff/StaffHeader';
import StaffOrderDetail from '../../component/Staff/StaffOrderDetail';

const OrderDetailPage = () => {
  return (
    <div className='staff'>
    <StaffHeader />
    <div class="container text-center">
        <div class="row">
            <div class="col-3">
                <StaffMenu activeItem={2} />
            </div>
            <div class="col-9">
                <StaffOrderDetail />
            </div>
        </div>
    </div>       
</div>
  )
}

export default OrderDetailPage;