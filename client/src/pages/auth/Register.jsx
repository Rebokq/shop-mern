import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('');
  let navigate = useNavigate();
  
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
      if (user && user.token) {
          navigate('/')
      }
  }, [user])

  const handleSubmit = async (e) => {
    console.log('form envoyé')
    e.preventDefault()
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    if (!email) {
      toast.error('Email obligatoire');
      return;

    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email à été envoyé à ${email}. Cliquer sur le lien pour finaliser l'inscription`);

    //Save email to local storage
    window.localStorage.setItem('emailForRegistration', email);

    //clear state
    setEmail('');
  }

  const registerForm = () => (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-900 leading-6'>Email</label>
          <div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'>
            </input>
          </div>
        </div>

        <div>
          <button type='submit' className='flex w-full justify-center bg-gray-900 rounded-md text-sm font-semibold text-white leading-6 py-1.5 '>
            REGISTER
          </button>
        </div>
        <div>
        <a>Vous avez déja compte ? <Link to='/login' className='text-blue-700 hover:text-blue-900'>Se connecter !</Link></a>
      </div>
      </form>

    </div>
  );


  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12'>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
          Créer un compte
        </h2>
      </div>

      {registerForm()}


    </div>
  )
}

export default Register