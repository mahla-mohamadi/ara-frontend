'use client'
import { createContext, useState, useEffect } from 'react'
import { getCookie } from '@/utils'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    const token = getCookie('authToken')
    setAuthToken(token)
  }, [])

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  )
}
