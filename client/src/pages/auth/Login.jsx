import React from 'react'
import { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import googleIcon from '../assets/images/googleIcon.png'
import facebookIcon from '../assets/images/facebook.png'

import { createOrUpdateUser } from '../../functions/auth'

const Login = () => {
  const [email, setEmail] = useState('louiskabore1998@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch()
  let navigate = useNavigate()

  const { user } = useSelector((state) => ({ ...state }))
  
  const roleBaseRedirect = (res) => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/user/history')
    }
  }

  useEffect(() => {
    if (user && user.token) {
      navigate('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBaseRedirect(res);
        })
        .catch((err) => console.log(err));
        //navigate('/')




    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

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
          roleBaseRedirect(res);

        })
        .catch((err) => console.log(err));
        //navigate('/')
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message)
      })
  }


  const LoginForm = () => (
    <div className='space-y-6' onSubmit={handleSubmit}>
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
        <label className='block text-sm font-medium text-gray-900 leading-6'>Password</label>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' block w-full p-1.5 rounded-md border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300'>
          </input>
        </div>
        <div className='mt-4'>
          <Link to='/forgot/password'><a className='text-blue-700 italic hover:text-blue-900 cursor-pointer'>Mot de passe oublié ?</a></Link>
        </div>
      </div>



      <div>
        <button type='submit' className='flex w-full justify-center bg-gray-900 rounded-md text-sm font-semibold text-white leading-6 py-1.5 ' >
          LOGIN
        </button>
      </div>
      <div>
        <a>Vous n'avez pas de compte ? <Link to='/register' className='text-blue-700 hover:text-blue-900'>Inscrivez-vous !</Link></a>
      </div>
      <div className="separator text-gray-400">or</div>



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
        <h2 className="mt-5 text-center text-4xl font-bold text-gray-900">
          Se connecter
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>

        {/*       {loading ? <h4 className='text-red-700'>Loading ...</h4> : <h4>Se connecter</h4>} */}
        {LoginForm()}

        <div className='grid grid-flow-col gap-4 w-full mt-6'>
          <div className=''>
            <button className='btnLogin w-full hover:bg-gray-100 rounded-md text-sm font-normal text-gray-900 leading-6 py-1.5 flex items-center justify-center'
              type='submit'
              onClick={googleLogin}>
              <img src={googleIcon} alt="googleIcon" className="w-5 h-5 mr-2" />
              Connexion Google
            </button>
          </div>
          <div className=''>
            <button className='btnLogin w-full hover:bg-gray-100 rounded-md text-sm font-normal text-gray-900 leading-6 py-1.5 flex items-center justify-center'
              type='submit' >
              <img src={facebookIcon} alt="FacebookIcon" className="w-5 h-5 mr-2" />
              Connexion Facebook
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Login