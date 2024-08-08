import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete'

import UserRoute from './components/routes/UserRoute';
import { auth } from './firebase'
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import AdminRoute from './components/routes/AdminRoute';
import HeaderNew from './components/nav/HeaderNew';
import Femme from './pages/category.jsx/Femme';

const App = () => {
  const dispatch = useDispatch()

  //Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log("user: ", user)
        currentUser(idTokenResult.token)
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
      }
    })

    return () => unsubscribe();
  }, [])


  return (
    <div className=''>
        {/* <Header /> */}
        <HeaderNew />
        <ToastContainer />

        <Routes>

          <Route path='/' Component={Home} />
          <Route path='/femme' Component={Femme} />

          <Route path='/register' Component={Register} />
          <Route path='/register/complete' Component={RegisterComplete} />
          <Route path='/forgot/password' Component={ForgotPassword} />

          <Route path='/login' Component={Login} />


          {/* <Route path='/user/history' element={<UserRoute><History /></UserRoute>} /> */}
          <Route path="/user/*" element={<UserRoute />} />

          <Route path='/admin/*' element={<AdminRoute />} />

        </Routes>
      </ div>
      );
}

      export default App;
