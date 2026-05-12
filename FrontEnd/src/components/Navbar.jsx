import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './CSS/Navbar.css'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { useContext } from 'react';


const Navbar = () => {
  const { displayCart, isLoggedIn, user, logout } = useContext(GlobalStateContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  
  const getInitials = () => {
    if (!user || !user.name) return '?'
    const names = user.name.split(' ')
    if (names.length > 1) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
    }
    return user.name.slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    setShowDropdown(false)
    logout()
  }

  return (
    <div className='outerNavbar'>
        <div className='Navbar'>
            <div className='LogoImage'>
              <img src="sugar_bloom.png" />
                
            </div>
            <div className='NavButtons'>
                <Link to="/"><button className='navbut'>Home</button></Link>
                
                <div 
                  className="user-profile" 
                  onMouseEnter={() => setShowDropdown('menu')} 
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <a href="/#items" style={{ textDecoration: 'none' }}>
                    <button className='navbut'>Menu ▾</button>
                  </a>
                  {showDropdown === 'menu' && (
                    <div className="profile-dropdown" style={{ top: '35px', right: 'auto', left: '0' }}>
                      <Link to="/cakes" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Cakes</div>
                      </Link>
                      <Link to="/cupcakes" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Cupcakes</div>
                      </Link>
                      <Link to="/pastries" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Pastries</div>
                      </Link>
                      <Link to="/desserts" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Desserts</div>
                      </Link>
                      <Link to="/ice-cream" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Ice Cream</div>
                      </Link>
                      <Link to="/donuts" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Donuts</div>
                      </Link>
                      <Link to="/muffins" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Muffins</div>
                      </Link>
                      <Link to="/puddings" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Puddings</div>
                      </Link>
                      <Link to="/drinks" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Drinks</div>
                      </Link>
                      <Link to="/brownies" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Brownies</div>
                      </Link>
                      <Link to="/macarons" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Macarons</div>
                      </Link>
                      <Link to="/waffles" onClick={() => setShowDropdown(false)}>
                        <div className="dropdown-item">Waffles</div>
                      </Link>
                    </div>
                  )}
                </div>

                <button className='theme-toggle' onClick={toggleDarkMode}>
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                <Link to="/about"><button className='navbut'>About</button></Link>
                {isLoggedIn && (
                  <Link to="/orders"><button className='navbut'>Orders</button></Link>
                )}
                {displayCart && (
                  <Link to="/cart"><button className='navbut'>Cart</button></Link>
                )}
                
                {isLoggedIn ? (
                  <div className="user-profile">
                    <div 
                      className="profile-circle" 
                      onClick={() => setShowDropdown(showDropdown === 'profile' ? false : 'profile')}
                    >
                      {getInitials()}
                    </div>
                    
                    {showDropdown === 'profile' && (
                      <div className="profile-dropdown">
                        <Link to="/profile" onClick={() => setShowDropdown(false)}>
                          <div className="dropdown-item">
                            <span className="dropdown-icon">👤</span>
                            Profile
                          </div>
                        </Link>
                        <Link to="/orders" onClick={() => setShowDropdown(false)}>
                          <div className="dropdown-item">
                            <span className="dropdown-icon">📦</span>
                            My Orders
                          </div>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-item logout" onClick={handleLogout}>
                          <span className="dropdown-icon">🚪</span>
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login"><button className='navbutloin'>Login/SignUp</button></Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar