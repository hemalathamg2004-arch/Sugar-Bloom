import React, { useContext } from 'react'
import './CSS/Items.css'
import { GlobalStateContext } from '../context/GlobalStateContext'

const CategoryPage = ({ category }) => {
    const { foodData, updateQuantity } = useContext(GlobalStateContext)

    // Filter items based on the passed category
    const filteredItems = foodData.filter(item => item.Category === category)

    const handleQuantityChange = async (item, delta) => {
        await updateQuantity(item.FoodID, delta)
    }

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className='Categories'>
                <div className='categories-nav'>
                    <h2 style={{ color: '#d86a8a', textAlign: 'center', margin: '0 auto' }}>{category}</h2>
                </div>
            </div>
            
            <div className="cards-grid">
                {filteredItems.length > 0 ? filteredItems.map((item) => (
                    <div key={item.FoodID} className="card">
                        <div className="card-image">
                            <img 
                                src={item.ImageName} 
                                alt={item.FoodName}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x300/ff9f4b/ffffff?text=Food"
                                }}
                            />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{item.FoodName}</h3>
                            <p className="card-price">₹{parseFloat(item.Price).toFixed(2)}</p>
                            <p className="card-description">{item.Description}</p>
                            <div className="card-category">{item.Category}</div>
                        </div>
                        <div className="card-footer">
                            {item.Quantity > 0 ? (
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.Quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    className="add-btn" 
                                    onClick={() => handleQuantityChange(item, 1)}
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>
                )) : (
                    <p style={{ textAlign: 'center', width: '100%', color: '#6b6b6b' }}>No items found for {category}.</p>
                )}
            </div>
        </div>
    )
}

export default CategoryPage
