import MySQLdb

# Database connection details
db_config = {
    'user': 'avnadmin',
    'passwd': 'AVNS_zIiJCNhbHOmY5UH1wTU',
    'host': 'mysql-488ad68-hemalathamg2004-e7c7.h.aivencloud.com',
    'port': 16576,
    'db': 'defaultdb',
    'ssl_mode': 'REQUIRED'
}

def update_brownie_price():
    try:
        conn = MySQLdb.connect(**db_config)
        cursor = conn.cursor()
        
        # Update Chocolate Brownie price
        cursor.execute("UPDATE FoodItems SET price = 150.00 WHERE foodname LIKE '%Chocolate Brownie%'")
        
        conn.commit()
        print(f"✅ Price updated! {cursor.rowcount} item(s) affected.")
        
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_brownie_price()
