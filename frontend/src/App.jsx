import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Sign_up from './Sign_up'

function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign_in' element={<Sign_up />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App