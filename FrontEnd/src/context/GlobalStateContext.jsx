import React, { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [Quantity, setQuantity] = useState(0)
  const [Togg, setTogg] = useState(false)
  const [displayCart, setDisplayCart] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sessionId, setSessionId] = useState('')
  const [foodData, setFoodData] = useState([])

  const navigate = useNavigate()

  const syncCartState = useCallback((data) => {
    if (!Array.isArray(data)) return;
    const total = data.reduce((sum, item) => sum + (item.Quantity || item.quantity || 0), 0)
    setQuantity(total)
    setDisplayCart(total > 0)
  }, [])

  const fetchFoodData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('https://sugar-bloom.onrender.com/')
      const data = await res.json()
      
      if (Array.isArray(data)) {
        // Normalize keys to lowercase for internal consistency
        const normalizedData = data.map(item => ({
          ...item,
          FoodID: item.FoodID || item.foodid,
          FoodName: item.FoodName || item.foodname,
          Price: item.Price || item.price,
          Category: item.Category || item.category,
          ImageName: item.ImageName || item.imagename,
          Description: item.Description || item.description,
          Quantity: item.Quantity || item.quantity || 0
        }))
        setFoodData(normalizedData)
        syncCartState(normalizedData)
      } else {
        console.error('Unexpected data format from backend:', data)
      }
    } catch (error) {
      console.error('Error fetching food data:', error)
    } finally {
      setLoading(false)
    }
  }, [syncCartState])

  useEffect(() => {
    let sid = localStorage.getItem('sessionId')
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('sessionId', sid)
    }
    setSessionId(sid)

    const savedUser = localStorage.getItem('user')
    const savedLoginState = localStorage.getItem('isLoggedIn')
    if (savedUser && savedLoginState === 'true') {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }

    fetchFoodData()
  }, [fetchFoodData])

  const updateQuantity = useCallback(async (foodId, delta) => {
    setFoodData(prev => {
      const updated = prev.map(item => {
        if (item.FoodID !== foodId) return item
        return { ...item, Quantity: Math.max(0, (item.Quantity || 0) + delta) }
      })
      syncCartState(updated)
      return updated
    })

    try {
      let response

      if (isLoggedIn && user) {
        response = await fetch(`https://sugar-bloom.onrender.com/update-quantity/${foodId}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: delta }),
        })
      } else {
        const currentItem = foodData.find(item => item.FoodID === foodId)
        const currentQty = currentItem?.Quantity || 0
        const newQuantity = Math.max(0, currentQty + delta)

        response = await fetch('https://sugar-bloom.onrender.com/session-cart/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, foodId, quantity: newQuantity }),
        })
      }

      if (!response.ok) {
        fetchFoodData()
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      fetchFoodData()
    }
  }, [isLoggedIn, user, sessionId, foodData, syncCartState, fetchFoodData])

  const clearCart = useCallback(async () => {
    try {
      if (isLoggedIn && user) {
        const itemsInCart = foodData.filter(item => item.Quantity > 0)
        for (const item of itemsInCart) {
          await fetch(`https://sugar-bloom.onrender.com/update-quantity/${item.FoodID}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: -item.Quantity }),
          })
        }
      } else {
        await fetch(`https://sugar-bloom.onrender.com/session-cart/clear/${sessionId}/`, {
          method: 'DELETE',
        })
      }

      setFoodData(prev => prev.map(item => ({ ...item, Quantity: 0 })))
      setQuantity(0)
      setDisplayCart(false)
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }, [isLoggedIn, user, sessionId, foodData])

  const transferSessionCartToUser = useCallback(async () => {
    try {
      const sessionRes = await fetch(`https://sugar-bloom.onrender.com/session-cart/${sessionId}/`)
      const sessionCart = await sessionRes.json()

      if (Array.isArray(sessionCart)) {
        for (const item of sessionCart) {
          await fetch(`https://sugar-bloom.onrender.com/update-quantity/${item.food_id}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: item.quantity }),
          })
        }
      }

      await fetch(`https://sugar-bloom.onrender.com/session-cart/clear/${sessionId}/`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error transferring cart:', error)
    }
  }, [sessionId])

  const login = useCallback(async (userData) => {
    await transferSessionCartToUser()

    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')

    fetchFoodData()
  }, [transferSessionCartToUser, fetchFoodData])

  const logout = useCallback(async () => {
    if (!user) return

    await clearCart()

    try {
      await fetch(`https://sugar-bloom.onrender.com/logout/${user.user_id}/`, { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    }

    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    setUser(null)
    setIsLoggedIn(false)
    navigate('/')
  }, [user, clearCart, navigate])

  const value = {
    Quantity, setQuantity,
    Togg, setTogg,
    displayCart, setDisplayCart,
    user, setUser,
    isLoggedIn, setIsLoggedIn,
    loading,
    sessionId,
    logout,
    login,
    updateQuantity,
    foodData,
    fetchFoodData,
  }

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )
}
