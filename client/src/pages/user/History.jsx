import React from 'react'
import UserNav from '../../components/nav/UserNav'

const History = () => {
    return (
        <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4'>

            <div className='flex flex-row '>
                <UserNav />
                History
            </div>
        </div>
    )
}

export default History