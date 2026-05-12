import os
import sys
import django
from django.conf import settings

settings.configure(
    DATABASES={
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'voiceassistant',
            'USER': 'root',
            'PASSWORD': 'YOUR_DATABASE_PASSWORD',
            'HOST': 'localhost',
        }
    },
    INSTALLED_APPS=[
        'app',
    ]
)
django.setup()

from django.db import connection
from openai import OpenAI
import json

transcript = 'order me strawberry dream cupcake pink berry danish raspberry micron pink cotton candy smell rose milk pudding'

try:
    openai_client = OpenAI(
        api_key='YOUR_GROQ_API_KEY',
        base_url='https://api.groq.com/openai/v1',
    )
    
    with connection.cursor() as cursor:
        cursor.execute('SELECT FoodName, Price, Category FROM FoodItems')
        food_data = cursor.fetchall()
    
    food_list = '\n'.join([f'- {name} (₹{price}) - {category}' for name, price, category in food_data])
    print('Food list length:', len(food_list))
    
    prompt = f"""
You are a food ordering assistant for Sugar Bloom. The user said: "{transcript}"

IMPORTANT RULES:
1. The user may say multiple things in one sentence
2. You MUST respond to LAST command you detect
3. IGNORE all other previous commands
4. Do NOT mention or acknowledge any other commands in your response

Available food items in our database:
{food_list}

Available pages/routes in our app:
- Home page (path: "/")
- About page (path: "/about")
- Login page (path: "/login")
- Cart page (path: "/cart")
- Checkout page with payment modal (path: "/cart#payment-modal")
- Orders page (path: "/orders")
- Menu/Items section (path: "/#items")

Based on the user's voice input, respond with ONE of these command types:

1. If user wants to ORDER an item:
{{
  "command": "ORDER",
  "items": [
    {{
      "name": "exact food name",
      "quantity": 1,
      "price": 100
    }}
  ],
  "response": "Added to cart"
}}

Return ONLY the JSON object, no additional text.
"""
    
    response = openai_client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[
            {'role': 'system', 'content': 'You are a helpful food ordering assistant. Always respond with valid JSON only.'},
            {'role': 'user', 'content': prompt}
        ],
        temperature=0.7,
        max_tokens=500
    )
    
    print('AI Response:', response.choices[0].message.content)
except Exception as e:
    import traceback
    traceback.print_exc()
