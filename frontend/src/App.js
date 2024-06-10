import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import List from './pages/List'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/book/list' element={<List/>} />
       {/* <Route path='/' element={<Home/>} /> */}

      </Routes>
    </div>
  )
}

export default App
