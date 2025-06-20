import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import axios from 'axios'
import { Terminal } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  const baseURL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000

        if (decoded.exp > now) {
          navigate('/dashboard')
        }
      } catch (err) {
        localStorage.removeItem('token')
      }
    }
  }, [navigate])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setAlert({ type: '', message: '' })

    try {
      const res = await axios.post(`${baseURL}/api/admin/login`, form)
      localStorage.setItem('token', res.data.token)
      setAlert({ type: 'success', message: 'Login Successful! Redirecting' })
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Invalid credentials. Please try again.'
      })
    }
  }

  const renderAlert = () => {
    if (!alert.message) return null

    return (
      <Alert
        variant={alert.type === 'error' ? 'destructive' : 'default'}
        className={`mb-4 ${
          alert.type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <Terminal className='h-4 w-4' />
        <AlertTitle>
          {' '}
          {alert.type === 'success' ? 'Success' : 'Login Failed'}{' '}
        </AlertTitle>
        <AlertDescription> {alert.message} </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
        <Card className='w-full max-w-md shadow-xl rounded-2xl py-10'>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            {renderAlert()}
            <form onSubmit={handleSubmit} className='space-y-7'>
              <div className='space-y-1'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Enter your username'
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type='submit' className='w-full cursor-pointer'>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login
