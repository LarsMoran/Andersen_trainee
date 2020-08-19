import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  const login = useCallback((jwtToken, email) => {
    setToken(jwtToken)
    setUserEmail(email)

    localStorage.setItem(storageName, JSON.stringify({
      userEmail: email, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserEmail(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userEmail)
    }
  }, [login])

  return { login, logout, token, userEmail }
}
