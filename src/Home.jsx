import React from 'react'
import App from './App'
import { Route, Routes } from 'react-router-dom'
import User from './User'

const Home = () => {
    return (

        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/user" element={<User />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

    )
}

export default Home
