import React from 'react'
import { useState } from 'react'
import '../../pages/user/Profile.css'
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import {LoadingOutlined } from '@ant-design/icons'

const UserModal = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('')

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async (e) => {
        e.preventDefault();
        console.log(password)


        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword('')
                toast.success("Mot de passe modifié")
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message)
            })
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <button className=' modify-button' onClick={showModal}>Modifier</button>
            <form >
                <Modal
                    open={open}
                    title="Changer le mot de passe"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <div className='space-x-1 pt-4'>
                            <button className='cancel-button ' onClick={handleCancel}>
                                Annuler
                            </button>,
                            <button key="submit" className='valid-button' loading={loading} onClick={handleOk} disabled={!password || loading} success>
                                Valider
                            </button>
                        </div>
                    ]}
                >

                    <div className='space-y-4 mt-8'>

                        <div>
                            <div className='flex flex-col'>
                                <label className='block text-sm font-medium text-gray-900 leading-6'>Mot de passe</label>{loading ? <LoadingOutlined /> : <h4></h4> }
                            </div>
                            <div>
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'
                                    placeholder='Entrer votre nouveau mot de passe'
                                    disabled={loading}>

                                </input>
                            </div>

                        </div>

                        {/* <div>
                            <label className='block text-sm font-medium text-gray-900 leading-6'>Nouveau mot de passe</label>
                            <div>
                                <input
                                    type='password'
                                    value=''

                                    className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'>
                                </input>
                            </div>
                        </div> */}

                    </div>

                </Modal>
            </form>
        </>
    );
}

export default UserModal
