import React from 'react'
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () => {
  return (
    <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4'>

      <div className='flex flex-row '>
        <AdminNav />
        AdminDashboard
      </div>
    </div>
  )
}

export default AdminDashboard