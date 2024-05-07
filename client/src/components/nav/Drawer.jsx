import React from 'react'
import './Drawer.css'
import { NavLink, Link } from 'react-router-dom';
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DrawerNav = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { user } = useSelector((state) => ({ ...state }))

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/login');
    }

    const menu = (
        <div className='space-y-6'>
        { user && user.role === 'admin' && (
            <Link to='/admin/dashboard'>Admin Dashboard</Link>

        )}

        <ul className='space-y-6'>
            <li><Link to='/user/history'>Profil</Link></li>
            <li>Commande</li>
            <li>Aide & contact</li>
        </ul>
        { user ? (
            <button  onClick={logout} style={{ color: 'red' }}>Se déconnecter</button>
        ) : (
            <Link to="/login" style={{ color: 'green' }}>Se connecter</Link>

        )
        
        }
        </div>
        
    )

    return (
        <div className='container'>
            {menu}
        </div>
    )
}

export default DrawerNav