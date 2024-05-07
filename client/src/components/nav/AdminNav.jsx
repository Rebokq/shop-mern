import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
        <div>
            <h4 className='text-lg font-medium'>Dashboard</h4>
            <div className='pt-4'>
                <ul className='flex flex-col px-4 space-y-4 font-light	'>
                    <li><Link to='/admin/dashboard'>Dashbaord</Link></li>
                    <li><Link to='/admin/product'>Product</Link></li>
                    <li><Link to='/admin/products'>Products</Link></li>
                    <li><Link to='/admin/category'>Category</Link></li>
                    <li><Link to='/admin/sub'>Sub Category</Link></li>
                    <li><Link to='/admin/coupon'>Coupon</Link></li>
                    <li><Link to='/user/password'>Password</Link></li>


                </ul>
            </div>
        </div>
  )
}

export default AdminNav