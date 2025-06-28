import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Sign_up from './Sign_up'
import Profile from './Profile'


function App() {
  return (

    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign_in' element={<Sign_up />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App