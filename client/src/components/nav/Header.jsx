import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { ShoppingOutlined, UserOutlined, } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd';

import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {
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
        <Menu className='text-xl'>

            {user && user.role === 'admin' && (
                <Menu.Item key="6">
                    <Link to='/admin/dashboard'>Admin Dashboard</Link>
                </Menu.Item>
            )}


            <Menu.Item key="1">
                <Link to='/user/history'>Profil</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <a className="" target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Commandes</a>
            </Menu.Item>
            <Menu.Item key="3">
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">Aide & contact</a>
            </Menu.Item>
            {user ? (
                <Menu.Item key="4" onClick={logout} style={{ color: 'red' }}>
                    Se déconnecter
                </Menu.Item>
            ) : (
                <Menu.Item key="5">
                    <Link to="/login" style={{ color: 'green' }}>Se connecter</Link>
                </Menu.Item>
            )}
        </Menu>
    );


    return (
        <div className='top-nav bg-white'>
            <div className='relative max-w-screen-xl mx-auto flex py-4 justify-between items-center'>
                <div>
                    <ul className='flex space-x-4 text-lg'>
                        <li><NavLink to="/femme">FEMME</NavLink></li>
                        <li><NavLink to="/homme">HOMME</NavLink></li>
                        <li><NavLink to="/enfant">ENFANT</NavLink></li>
                    </ul>
                </div>

                <div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-lg'>
                    <NavLink to="/">SNEAKEASE</NavLink>
                </div>

                <div >
                    <ul className='flex  space-x-4 text-xl'>

                        <li>
                            <Dropdown overlay={menu} placement="bottom" className='' arrow>
                                <UserOutlined />
                            </Dropdown>
                        </li>


                        {/* <li><NavLink to="/register" ><UserOutlined /></NavLink></li>*/}
                        <li><NavLink to="/cart" ><ShoppingOutlined /></NavLink></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
