import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/Orders.css'
import { GlobalStateContext } from '../context/GlobalStateContext'
const OrdersPage = () => {
    const { isLoggedIn, user } = useContext(GlobalStateContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: { pathname: '/orders' } } })
            return
        }

        fetchOrders()
        const intervalId = setInterval(fetchOrders, 5000)
        return () => clearInterval(intervalId)
    }, [isLoggedIn])

    const fetchOrders = async () => {
        try {
            const response = await fetch(`https://sugar-bloom.onrender.com/orders/${user.user_id}/`)
            const data = await response.json()
            
            // Ensure data is an array
            if (Array.isArray(data)) {
                setOrders(data)
            } else if (data && data.success === false) {
                console.error("Error from server:", data.error)
                setOrders([])
            } else {
                console.error("Unexpected response format:", data)
                setOrders([])
            }
            
            setLoading(false)
        } catch (error) {
            console.error("Error fetching orders:", error)
            setOrders([])
            setLoading(false)
        }
    }

    const getStatusClass = (status) => {
        switch(status) {
            case 'placed': return 'status-placed'
            case 'confirmed': return 'status-confirmed'
            case 'preparing': return 'status-preparing'
            case 'out-for-delivery': return 'status-out-for-delivery'
            case 'delivered': return 'status-delivered'
            default: return ''
        }
    }

    const getStatusIcon = (status) => {
        switch(status) {
            case 'placed': return '📝'
            case 'confirmed': return '✅'
            case 'preparing': return '👨‍🍳'
            case 'out-for-delivery': return '🛵'
            case 'delivered': return '🍽️'
            default: return '📦'
        }
    }

    if (!isLoggedIn) {
        return null
    }

    return (
        <div className="orders-container">
            <style>{`
                .orders-container {
                    max-width: 900px;
                    margin: 40px auto;
                    padding: 20px;
                    font-family: 'Poppins', sans-serif;
                    min-height: 60vh;
                    background: #fffafa;
                }

                .orders-container h1 {
                    color: #ff69b4;
                    text-align: center;
                    margin-bottom: 40px;
                    font-size: 2.8rem;
                    font-weight: 800;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
                }

                .orders-list {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 25px;
                }

                .order-card {
                    background: white;
                    border-radius: 20px;
                    padding: 25px;
                    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.1);
                    border: 1px solid #ffe4e1;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .order-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.2);
                }

                .order-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px dashed #ffe4e1;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }

                .order-id {
                    font-weight: 800;
                    color: #444;
                    font-size: 1.2rem;
                    background: #fff0f5;
                    padding: 5px 15px;
                    border-radius: 10px;
                }

                .order-date {
                    color: #999;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .order-items {
                    margin-bottom: 25px;
                }

                .order-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    color: #555;
                    border-bottom: 1px solid #fdf2f5;
                }

                .item-name {
                    flex: 2;
                    font-weight: 600;
                }

                .item-quantity {
                    flex: 1;
                    text-align: center;
                    color: #ff69b4;
                    font-weight: 800;
                }

                .item-price {
                    flex: 1;
                    text-align: right;
                    font-weight: 700;
                    color: #333;
                }

                .order-footer {
                    background: linear-gradient(135deg, #fff0f5 0%, #fffafa 100%);
                    padding: 20px;
                    border-radius: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .order-total {
                    font-weight: 800;
                    color: #333;
                    font-size: 1.1rem;
                }

                .order-total span {
                    color: #ff1493;
                    font-size: 1.4rem;
                    margin-left: 5px;
                }

                .order-status {
                    padding: 8px 20px;
                    border-radius: 25px;
                    font-weight: 800;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .status-placed { background: #e6f7ff; color: #1890ff; }
                .status-delivered { background: #f6ffed; color: #52c41a; }
                .status-completed { background: #f6ffed; color: #52c41a; }

                .order-payment {
                    font-size: 0.9rem;
                    color: #777;
                    font-weight: 600;
                }
            `}</style>
            <h1>My Orders</h1>
            
            {loading ? (
                <div className="orders-loading">Loading your orders...</div>
            ) : !Array.isArray(orders) || orders.length === 0 ? (
                <div className="no-orders">
                    <h2>No orders yet</h2>
                    <p>Hungry? Order some delicious food!</p>
                    <button onClick={() => navigate('/#items')}>Browse Menu</button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.order_id} className="order-card">
                            <div className="order-header">
                                <div className="order-id">
                                    Order #{order.order_id}
                                </div>
                                <div className="order-date">
                                    {new Date(order.order_date).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">x{item.quantity}</span>
                                        <span className="item-price">₹{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    Total: <span>₹{order.total_amount}</span>
                                </div>
                                <div className="order-payment">
                                    Payment: {order.payment_method === 'COD' ? 'Cash on Delivery' : 'Online'}
                                </div>
                                <div className={`order-status ${getStatusClass(order.order_status)}`}>
                                    {getStatusIcon(order.order_status)} {order.order_status?.replace(/-/g, ' ') || 'Pending'}
                                </div>
                            </div>

                            {order.order_status === 'delivered' && (
                                <div className="order-review">
                                    <button className="review-btn">Rate & Review</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage
