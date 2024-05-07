import React from 'react'
import { Link } from 'react-router-dom'
const UserNav = () => {
    return (
        <div>
            <h4 className='text-lg font-medium'>Mon compte</h4>
            <div className='pt-4'>
                <ul className='flex flex-col px-4 space-y-4 font-light	'>
                    <li><Link to='/user/history'>Historique</Link></li>
                    <li><Link to='/user/wishlist'>Wishlist</Link></li>
                    <li><Link to='/user/profile'>Données personnelles</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default UserNav