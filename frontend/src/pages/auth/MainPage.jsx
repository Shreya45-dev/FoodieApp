/*import React from 'react'

const MainPage = () => {
  return (
    <div className="h-screen w-screen fles items-center justify-center">
        <Link to="/food-partner/register">Register As Food Partner</Link>
        <Link to="/user/register">Register As User</Link>
      
    </div>
  )
}

export default MainPage */


import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      <div className="bg-white/10 backdrop-blur-lg p-16 rounded-3xl shadow-2xl text-center border h-60 border-white/20 w-[400px] md:w-[400px]">
        
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome 🚀
        </h1>
        
        <p className="text-white/80 text-lg p-8 mb-10 ">
          Choose how you want to get started
        </p>

        <div className="flex flex-col gap-8">
          
          <Link
            to="/food-partner/register"
            className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-2xl text-lg hover:bg-indigo-100 transition duration-300 shadow-lg"
          >
            🍔 Register as Food Partner
          </Link>

          <Link
            to="/user/register"
            className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-2xl text-lg hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            👤 Register as User
          </Link>

        </div>
      </div>

    </div>
  )
}

export default MainPage