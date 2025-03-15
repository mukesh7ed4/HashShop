import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

// Mock users for testing
const MOCK_USERS = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123' // In real app, never store plain passwords
  },
  {
    id: 2,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123'
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const loginUser = async (email, password) => {
    const foundUser = MOCK_USERS.find(
      user => user.email === email && user.password === password
    )

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }

  const logout = () => {
    // Clear all auth related data
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('rememberedEmail')
    // Redirect to login page
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      loginUser, 
      logout, 
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 