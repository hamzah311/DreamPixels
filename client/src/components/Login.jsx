import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-[90%] max-w-md rounded-2xl bg-white p-8 shadow-xl text-slate-600"
      >
        {/* Title */}
        <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
          {state}
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          {state === 'Login'
            ? 'Welcome back! Please sign in to continue.'
            : 'Create your account to get started.'}
        </p>

        {/* Inputs */}
        {state !== 'Login' && (
          <div className="mt-6 flex items-center gap-3 rounded-full border border-gray-300 px-5 py-2.5 shadow-sm focus-within:border-teal-500">
            <img src={assets.profile_icon} alt="" width={18} />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 rounded-full border border-gray-300 px-5 py-2.5 shadow-sm focus-within:border-teal-500">
          <img src={assets.email_icon} alt="" width={18} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Email Address"
            required
          />
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-full border border-gray-300 px-5 py-2.5 shadow-sm focus-within:border-teal-500">
          <img src={assets.lock_icon} alt="" width={18} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Password"
            required
          />
        </div>

        {/* Forgot Password */}
        {state === 'Login' && (
          <p className="mt-3 cursor-pointer text-sm text-teal-600 hover:underline">
            Forgot password?
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 py-2.5 text-white font-medium shadow-md hover:opacity-90 transition duration-300"
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {/* Switch form */}
        {state === 'Login' ? (
          <p className="mt-5 text-center text-sm">
            Don’t have an account?{' '}
            <span
              className="cursor-pointer font-medium text-yellow-600 hover:underline"
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{' '}
            <span
              className="cursor-pointer font-medium text-yellow-600 hover:underline"
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}

        {/* Close Button */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute right-5 top-5 h-5 w-5 cursor-pointer opacity-70 hover:opacity-100"
        />
      </motion.form>
    </div>
  )
}

export default Login
