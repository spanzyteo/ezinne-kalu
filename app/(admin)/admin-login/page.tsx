'use client'

import * as React from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import Image from 'next/image'

const AdminLogin = () =>{
  const router = useRouter()
  const searchParams = useSearchParams()
  const key = searchParams.get('key')

  useEffect(() => {
    if (key !== 'password') {
      notFound()
    }
  }, [key])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        "https://ezinne-api.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );
      if (response.status === 200) {
        const token = response.data.token
        Cookies.set('isAdmin', 'true')
        Cookies.set('adminToken', token, {expires: 1})


        toast.success("Login successful!");
        router.push('/admin')
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred while logging in"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center mx-auto gap-6">
      {/* <h1 className="text-7xl font-bold text-gray-700">Ezinne Kalu</h1> */}

      <Image width={150} height={150} alt='profile' src={'/profile.jpg'} className='h-[150px] w-[150px] object-cover rounded-full'/>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center w-full"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border-2 border-gray-700 md:w-[300px] w-[95%] rounded-[8px] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border-2 border-gray-700 md:w-[300px] w-[95%] rounded-[8px] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-800 text-white px-6 py-3 rounded-[8px] hover:bg-gray-700 transition duration-300 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin