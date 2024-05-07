import React from 'react'
import UserNav from '../../components/nav/UserNav'
import UserModal from '../../components/modal/UserModal'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import './Profile.css'
const Profil = () => {
    return (
        <div className='relative max-w-screen-xl mx-auto flex justify-between items-center mt-4' >

            <div className='flex flex-row '>
                <UserNav />
                <div className='p-4 space-y-2'>
                    <h4 className='text-2xl font-semibold'>Profile</h4>
                    <p className='font-light'>Voir et mettre à jour vos informations ici.</p>

                    <div className='pb-4 pt-8 grid grid-cols-4 gap-1 '>
                        <div className='mx-4'>
                            <UserOutlined className='text-4xl' />
                        </div>

                        <div className=''>
                            <p className='mb-2 font-bold'>Nom</p>
                            <span>Louis</span>
                        </div>
                        <div>
                            <p className='font-bold'>Telephone</p>
                            <span>(+33) _____</span>
                        </div>
                        <div className='flex items-center'>
                            <button className='modify-button'>Modifier</button>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='py-4 grid grid-cols-4 gap-1 '>
                        <div className='mx-4'>
                            <MailOutlined className='text-4xl' />
                        </div>

                        <div className=' justify-center'>
                            <p className='mb-2 font-bold'>Email</p>
                            <span>Louis</span>
                        </div>
                        <div></div>
                        
                        <div className='flex items-center  '>
                            <button className='modify-button'>Modifier</button>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='py-4 grid grid-cols-4 gap-1'>
                        <div className='mx-4'>
                            <LockOutlined className='text-4xl' />
                        </div>
                        <div>
                            <p className='mb-2 font-bold'>Mot de passe </p>
                            <span>************</span>
                        </div>
                        <div></div>

                        

                        <div className='flex items-center'>
                            <UserModal />
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Profil