import { useEffect } from 'react';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../../firebase'

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            navigate('/')
        }
    }, [user])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_LOGIN_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success('Regardez vos mails pour modifier le mot de passe')
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.message)
                console.log('error message in forgot password', error)
            })

    }
    return (
        <div>
            <div className='flex min-h-full flex-col justify-center px-6 py-12'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-5 text-center text-4xl font-bold text-gray-900">
                        Mot de passe oublié ?
                    </h2>
                    <div className='mt-4 italic text-gray-500 antialiased'>
                        <p>Entrez votre e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.</p>
                    </div>
                </div>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label className='block text-sm font-medium text-gray-900 leading-6'>Email</label>
                            <div>
                                <input className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='e.g. allezlafrance@hotmail.fr'
                                    autoFocus
                                >
                                </input>
                            </div>
                        </div>

                        <div>
                            <button type='submit' className='flex w-full justify-center bg-gray-900 rounded-md text-sm font-semibold text-white leading-6 py-1.5 ' >
                                SUBMIT
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword