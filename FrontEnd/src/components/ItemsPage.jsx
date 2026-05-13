import React, { useState, useEffect, useContext } from 'react'
import './CSS/Items.css'
import { GlobalStateContext } from '../context/GlobalStateContext'

const ItemsPage = () => {
    const { foodData, updateQuantity, loading } = useContext(GlobalStateContext)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [categories, setCategories] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (foodData && foodData.length > 0) {
            const uniqueCategories = ['All', ...new Set(foodData.map(item => item.Category || item.category || 'Other'))]
            setCategories(uniqueCategories)
        }
    }, [foodData])

    const filteredItems = foodData.filter(item => {
        const category = item.Category || item.category || '';
        const foodName = item.FoodName || item.foodname || '';
        const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
        const matchesSearch = foodName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleQuantityChange = async (item, delta) => {
        const foodId = item.FoodID || item.foodid;
        await updateQuantity(foodId, delta)
    }

    if (loading && foodData.length === 0) {
        return (
            <div className="items-loading">
                <div className="spinner"></div>
                <p>Baking delicious treats for you...</p>
            </div>
        );
    }

    return (
        <>
        <div className="search-container">
            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                    type="text" 
                    placeholder="Search your favorite dessert..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        {foodData.length > 0 ? (
            <>
                <div className='Categories' id='items'>
                    <div className='categories-nav'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="cards-grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.FoodID} className="card">
                                <div className="card-image">
                                    <img 
                                        src={item.ImageName || item.imagename} 
                                        alt={item.FoodName || item.foodname}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300x300/ff9f4b/ffffff?text=Food"
                                        }}
                                    />
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{item.FoodName || item.foodname}</h3>
                                    <p className="card-price">₹{parseFloat(item.Price || item.price || 0).toFixed(2)}</p>
                                    <p className="card-description">{item.Description || item.description}</p>
                                    <div className="card-category">{item.Category || item.category}</div>
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
                        ))
                    ) : (
                        <div className="no-items">
                            <p>No desserts found matching your search. 🍩</p>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <div className="no-items">
                <p>Oops! Our kitchen seems empty right now. Please check back later. 🍰</p>
            </div>
        )}
        </>
    )
}

export default ItemsPage
