import React, { useState, useRef, useEffect } from 'react';
import './HeaderNew.css';
import DrawerNav from './Drawer';

import { ConfigProvider, Drawer } from 'antd';
import { createStyles, useTheme } from 'antd';

import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import femme from '../../assets/images/Women.jpg'
import homme from '../../assets/images/Men.jpg'
import enfant from '../../assets/images/kid.jpeg'

const HeaderNew = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { user } = useSelector((state) => ({ ...state }))
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/login');
    }


    const showDefaultDrawer = () => {
        setSize('default');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const CartIcon = () => {
        return (
            <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 96v32H288V96c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-32 64H48c-8.8 0-16 7.2-16 16V416c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V176c0-8.8-7.2-16-16-16H320v80c0 8.8-7.2 16-16 16s-16-7.2-16-16V160H160v80c0 8.8-7.2 16-16 16s-16-7.2-16-16V160zm0-32V96c0-53 43-96 96-96s96 43 96 96v32h80c26.5 0 48 21.5 48 48V416c0 53-43 96-96 96H96c-53 0-96-43-96-96V176c0-26.5 21.5-48 48-48h80z" /></svg>
        );
    };

    const SearchIcon = () => {
        return (
            <svg className="w-4 h-4 mr-2 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z" /></svg>
        );
    };

    const UserIcon = () => {
        return (
            <svg className="w-4 h-4 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM32 480H416c-1.2-79.7-66.2-144-146.3-144H178.3c-80 0-145 64.3-146.3 144zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
        );
    };

    const drawerStyles = {
        mask: {
            backdropFilter: 'blur(10px)',
        },

    };

    const imageDropdown = {
        femme:femme,
        homme: homme,
        enfant: enfant 
    }

    //DROPDOWN MENU
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [activeItem, setActiveItem] = useState(''); // État pour l'élément actif

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (e) => {
        const value = e.target.getAttribute('value');
        setSelectedValue(value);
        setActiveItem(value); // Mettre à jour l'élément actif
        setIsOpen(true)
    }
    
    // Fermer le menu si un clic est détecté en dehors du menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.nav-content') && !event.target.closest('.menu-dropdown')) {
                setIsOpen(false);
                setActiveItem('');

            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className='mt-4 mx-4 pb-2 navbar'>
            <div className='navigation flex space-x-2 items-center'>
                <div className='new-nav-items h-10 flex items-center'><ul><NavLink to='/' className={({ isActive }) => (isActive ? 'inactive' : 'inactive')}>SNEAKEASE</NavLink></ul></div>

                <div>
                    <div className='nav-content new-nav-items relative h-10 flex items-center space-x-8'>
                        {/*  <ul><NavLink to='/user/history'>Nouveau</NavLink></ul>
                        <ul><NavLink to="/femme">FEMME</NavLink></ul>
                        <ul><NavLink to="/homme">HOMME</NavLink></ul>
                        <ul><NavLink to="/enfant" >ENFANT</NavLink></ul> */}
                        <ul className={activeItem === 'Nouveau' ? 'active' : ''}>Nouveau</ul>
                        <ul onClick={handleSelect} value="femme" className={activeItem === 'femme' ? 'active' : ''}>FEMME</ul>
                        <ul onClick={handleSelect} value="homme" className={activeItem === 'homme' ? 'active' : ''}>HOMME</ul>
                        <ul onClick={handleSelect} value="enfant" className={activeItem === 'enfant' ? 'active' : ''}>ENFANT</ul>
                    </div>

                    {isOpen && (
                        <div className='menu-dropdown absolute mt-1 rounded-xl w-2/4 h-48 p-2 flex'>
                            <div className='h-full rounded-xl w-1/5 bg-red-400 mr-2' >
                                <img className='object-cover w-full rounded-xl h-full' src={imageDropdown[selectedValue] || ''}></img>
                            </div>
                            <div className='flex flex-col space-y-2 whitespace-nowrap text-l font-bold'>
                                <a>Tout voir {selectedValue}</a>
                                <a>Nouveautés</a>
                                <a>Produits populaire</a>

                            </div>
                            <div className='w-full flex justify-around'>
                                <p>Vestes</p>
                                <p>Hauts</p>
                                <p>Pantalons</p>

                            </div>
                        </div>
                    )}

                </div>

                <div className='flex-1'></div>
                <div className='new-nav-items search-button p-2 flex items-center'><SearchIcon /> <input className='search-input' placeholder='Search ..' /></div>
                <div className='new-nav-items cart-button p-2 flex items-center'><CartIcon /> <a>PANIER (0)</a></div>
                <button className='new-nav-items profile-button p-2 flex items-center cursor-pointer' onClick={showDefaultDrawer}>
                    <UserIcon />
                </button>

            </div>

            <Drawer
                title={`Profil`}
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
                styles={drawerStyles}

            >
                <DrawerNav />
            </Drawer>

        </div>
    )
}

export default HeaderNew