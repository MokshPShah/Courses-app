import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  // 🔁 Listen for logout in other tabs
  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === 'token' && event.newValue === null) {
        window.location.href = '/admin'
      }
    }

    window.addEventListener('storage', syncLogout)
    return () => window.removeEventListener('storage', syncLogout)
  }, [])

  // 🔒 No token? Block access
  if (!token) {
    return <Navigate to="/admin" replace />
  }

  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000

    // 🔐 Expired token? Remove it and redirect
    if (decoded.exp < now) {
      localStorage.removeItem('token')
      return <Navigate to="/admin" replace />
    }
  } catch (error) {
    // 🧨 Invalid token? Clear and redirect
    localStorage.removeItem('token')
    return <Navigate to="/admin" replace />
  }

  // ✅ Valid token? Allow access
  return children
}

export default ProtectedRoute
