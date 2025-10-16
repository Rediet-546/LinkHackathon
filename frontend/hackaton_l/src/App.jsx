import React from 'react'
import RegisterPage from './page/RegisterPage'
import LoginPage from './page/LoginPage'
import { Route, Routes,Navigate } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import { Authentication } from './store/Authentication'

const App = () => {

  const {authUser} = Authentication();
  return (
   <>
   <Routes>
      <Route path="/*" element={authUser ? <Dashboard/> : <Navigate to="/login" />}/>
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={ <RegisterPage/>} />
   </Routes>
   </>
  )
}

export default App