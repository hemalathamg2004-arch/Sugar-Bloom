import mysql.connector
from datetime import datetime

# Database connection details
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Laya@2003',
    'database': 'voiceassistant'
}

def update_database():
    try:
        print("Connecting to the database...")
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # Force clear the table
        print("Truncating food items table...")
        cursor.execute("TRUNCATE TABLE FoodItems;")
        
        # 28 Pink Dessert Items
        new_items = [
            # Cupcakes
            ("Strawberry Dream Cupcake", "A fluffy vanilla cupcake topped with pink strawberry buttercream.", 120.00, "Cupcakes", "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600&auto=format&fit=crop", 1, 4.8, 0, 50),
            ("Pink Velvet Cupcake", "Classic pink velvet with cream cheese frosting and sprinkles.", 140.00, "Cupcakes", "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=600&auto=format&fit=crop", 1, 4.9, 0, 40),
            
            # Cakes
            ("Pink Rose Layer Cake", "Three layers of sponge cake with pink rose buttercream.", 550.00, "Cakes", "https://funcakes.com/content/uploads/2022/04/Fun-Cakes-20220324-Roze_trouwtaaart-fondant-02-960x960-c-default.jpg", 1, 4.7, 0, 10),
            ("Strawberry Shortcake", "Fresh strawberries and pink whipped cream layered in sponge cake.", 480.00, "Cakes", "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop", 1, 4.9, 0, 15),
            
            # Pastries
            ("Pink Berry Danish", "Flaky pastry filled with mixed berry compote and pink glaze.", 90.00, "Macarons", "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop", 1, 4.5, 0, 30),
            ("Raspberry Macaron", "Delicate almond shells with pink raspberry ganache filling.", 60.00, "Macarons", "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop", 1, 4.6, 0, 100),
            
            # Desserts
            ("Rose Panna Cotta", "Silky vanilla panna cotta with pink rose coulis.", 180.00, "Desserts", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8oIB5T9oiuGMsM7pPLGzDTw9NqsA9sH7zw&s", 1, 4.8, 0, 20),
            ("Pink Berry Trifle", "Layers of pink cake, custard, and fresh berries.", 200.00, "Desserts", "https://en-chatelaine.mblycdn.com/ench/resized/2023/03/w767/raspberry-trifle-feature.jpg", 1, 4.7, 0, 25),
            
            # Ice Cream
            ("Strawberry Pink Sundae", "Classic strawberry ice cream with pink syrup and a cherry.", 150.00, "Ice Cream", "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop", 1, 4.9, 0, 40),
            ("Pink Cotton Candy Swirl", "Sweet pink cotton candy flavored ice cream.", 130.00, "Ice Cream", "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop", 1, 4.6, 0, 35),
            
            # Donuts
            ("Pink Glazed Donut", "Classic ring donut with sweet pink strawberry glaze and sprinkles.", 80.00, "Donuts", "https://i.pinimg.com/736x/cc/e9/4d/cce94d9d2f26ed2b5c62b6c0cd463914.jpg", 1, 4.8, 0, 50),
            ("Chocolate Glazed Donut", "Classic ring donut with sweet chocolate glaze and sprinkles.", 80.00, "Donuts", "https://mommyshomecooking.com/wp-content/uploads/2025/02/Easy-Chocolate-Frosted-Cake-Donuts-Egg-Free-17.jpg", 1, 4.8, 0, 50),
            
            
            # Muffins
            ("Raspberry Pink Muffin", "Soft and fluffy muffin bursting with fresh pink raspberries.", 110.00, "Muffins", "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop", 1, 4.7, 0, 40),
            
            # Puddings & Mousses
            ("Pink Velvet Mousse", "Three layers of heavenly pink and white chocolate mousse.", 240.00, "Desserts", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFHqqz1f6rrpdchVo6LHJSwYujKl1nulXiQ&s", 1, 4.9, 0, 15),
            ("Strawberry Pudding", "A delicious hybrid of soft sponge cake and creamy pink strawberry pudding.", 180.00, "Puddings", "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop", 1, 4.9, 0, 15),
            ("Rose Milk Pudding", "Warm delicate rose-infused milk pudding with pink petals.", 190.00, "Puddings", "https://aartimadan.com/wp-content/uploads/2023/04/rose-milk-pudding.jpg", 1, 4.8, 0, 20),
            
            # Waffles
            ("Strawberry  Waffles", "Golden waffles topped with fresh strawberries and pink cream.", 210.00, "Waffles", "https://hannahcooking.com/wp-content/uploads/2025/06/strawberry-waffles-500x500.jpg", 1, 4.9, 0, 20),
            
            # Additional Desserts
            ("Pink Berry Tiramisu", "Creamy Italian dessert with strawberry-soaked ladyfingers.", 220.00, "Desserts", "https://www.foodnetwork.com/content/dam/images/food/fullset/2011/11/23/0/FN_tiramisu-006_s4x3.jpg", 1, 4.9, 0, 15),
            ("Cherry Pink Cheesecake", "Velvety cheesecake topped with a decadent pink cherry glaze.", 260.00, "Cakes", "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop", 1, 4.8, 0, 10),
            ("Pink Macarons", "Delicate almond meringue cookies with a sweet strawberry filling.", 120.00, "Macarons", "https://www.shutterstock.com/image-photo/pink-macron-sweet-candies-eating-600w-2322744691.jpg", 1, 4.7, 0, 30),
            ("Chocolate Cookies", "Delicate almond meringue cookies with chocolate filling.", 120.00, "Macarons", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop", 1, 4.7, 0, 30),
            ("Rose Mochi", "Soft and chewy rice cake filled with sweet pink bean paste.", 140.00, "Desserts", "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop", 1, 4.6, 0, 25),
            (" Chocolate Brownie", "Rich, gooey chocolate brownie with a chocolate cream ", 1.00, "Brownies", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", 1, 4.8, 0, 40),
            ("Rose Infused Baklava", "Crispy layers of filo pastry filled with nuts and sweet rose syrup.", 190.00, "Desserts", "https://thumbs.dreamstime.com/b/delicious-baklava-pistachios-pink-poppy-seeds-307276293.jpg", 1, 4.7, 0, 20),
            ("Sugar Churros", "Crispy fried dough sticks coated in pink cinnamon sugar.", 130.00, "Desserts", "https://i.pinimg.com/736x/80/fc/6d/80fc6db137e657951faf1e762fdfeef2.jpg", 1, 4.9, 0, 25),
            ("Raspberry Oreo Delight", "No-bake dessert layers with crushed Oreos and fresh raspberry cream.", 180.00, "Desserts", "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=600&auto=format&fit=crop", 1, 4.8, 0, 20),
            ("Pink Berry Gelato", "Authentic Italian style frozen dessert with intense pink berry flavor.", 160.00, "Ice Cream", "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=600&auto=format&fit=crop", 1, 4.8, 0, 30),
            
            # Drinks
            ("Pink Lemonade Mojito", "Refreshing mocktail with pink lemonade, mint, and soda.", 140.00, "Drinks", "https://media.istockphoto.com/id/1395736637/photo/spring-or-summer-cold-cocktail-raspberry-lemonade.jpg?s=612x612&w=0&k=20&c=Eim8oSm-ycxAVssFPrOVwWpeo6iOaoZkkglKrmbKSk4=", 1, 4.8, 0, 30),
            ("Ultimate Pink Freakshake", "Strawberry milkshake topped with a pink glazed donut and whipped cream.", 280.00, "Drinks", "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop", 1, 4.9, 0, 10),
            ("Mangosteen Juice", "Freshly squeezed strawberry and rose petal juice.", 120.00, "Drinks", "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=600&auto=format&fit=crop", 1, 4.7, 0, 35),
        ]

        # Insert query
        insert_query = """
            INSERT INTO FoodItems 
            (foodname, description, price, category, imagename, isavailable, rating, quantity, stock) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        print("Inserting 28 pink dessert items...")
        cursor.executemany(insert_query, new_items)
        
        # Commit changes
        conn.commit()
        print(f"Successfully inserted {cursor.rowcount} unique pink items!")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    update_database()
