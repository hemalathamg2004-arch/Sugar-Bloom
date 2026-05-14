import MySQLdb
import os

# Database connection details (Same as your settings.py)
db_config = {
    'user': 'avnadmin',
    'passwd': 'AVNS_zIiJCNhbHOmY5UH1wTU',
    'host': 'mysql-488ad68-hemalathamg2004-e7c7.h.aivencloud.com',
    'port': 16576,
    'db': 'defaultdb',
    'ssl_mode': 'REQUIRED'
}

def create_tables():
    try:
        conn = MySQLdb.connect(**db_config)
        cursor = conn.cursor()
        
        print("Connected to Aiven MySQL...")

        # 1. Create Users Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_logged_in INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        print("Table 'users' verified/created.")

        # 2. Create Session Carts Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS session_carts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                food_id INT NOT NULL,
                quantity INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """)
        print("Table 'session_carts' verified/created.")

        # 3. Create Orders Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id VARCHAR(100) UNIQUE NOT NULL,
                razorpay_order_id VARCHAR(100),
                payment_id VARCHAR(100),
                amount DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'INR',
                payment_method VARCHAR(50),
                status VARCHAR(50) DEFAULT 'pending',
                items TEXT,
                customer_details TEXT,
                signature VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        """)
        print("Table 'orders' verified/created.")

        conn.commit()
        cursor.close()
        conn.close()
        print("\n🎉 ALL TABLES CREATED SUCCESSFULLY! Your app is now ready.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_tables()
