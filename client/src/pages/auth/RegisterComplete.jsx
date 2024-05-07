import React from 'react'
import { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const { user } = useSelector((state) => ({ ...state }))

    useState(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Email et mot de passe obligatoire');
            return;
        }

        if (password < 6) {
            toast.error('Utilisez 6 caractères ou plus pour votre mot de passe')
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                // remove from local storage
                window.localStorage.removeItem('emailForRegistration')

                // get user token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                //redux store
                console.log('user', user, 'idToken', idTokenResult)
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
                    //redirect
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const completeRegistrationForm = () => (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>

            <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium text-gray-900 leading-6'>Email</label>
                    <div>
                        <input
                            type='email'
                            value={email}
                            disabled
                            className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300' />

                    </div>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-900 leading-6'>Mot de passe </label>
                    <div>
                        <input id=''
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'>
                        </input>
                    </div>
                </div>


                <div>
                    <button type='submit' className='flex w-full justify-center bg-gray-900 rounded-md text-sm font-semibold text-white leading-6 py-1.5 '>
                        Confirmer
                    </button>
                </div>
            </form>

        </div>
    )


    return (
        <div className='flex min-h-full flex-col justify-center px-6 py-12'>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
                    Confirmer votre compte
                </h2>
            </div>

            {completeRegistrationForm()}


        </div>
    )
}

export default RegisterComplete