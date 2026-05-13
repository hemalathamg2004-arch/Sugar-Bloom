import { createRoot } from 'react-dom/client';
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/Orders';

import CategoryPage from './components/CategoryPage';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<HomePage />,
      },
      {
        path:'/about',
        element:<AboutPage />,
      },
      {
        path:'/login',
        element:<LoginPage />,
      },
      {
        path:'/cart',
        element:<CartPage />,
      },
      {
        path:'/profile',
        element:<ProfilePage />,
      },
      {
        path:'/orders',
        element:<OrdersPage />,
      },
      {
        path:'/cakes',
        element:<CategoryPage category="Cakes" />,
      },
      {
        path:'/pastries',
        element:<CategoryPage category="Pastries" />,
      },
      {
        path:'/desserts',
        element:<CategoryPage category="Desserts" />,
      },
      {
        path:'/ice-cream',
        element:<CategoryPage category="Ice Cream" />,
      },
      {
        path:'/cupcakes',
        element:<CategoryPage category="Cupcakes" />,
      },
      {
        path:'/donuts',
        element:<CategoryPage category="Donuts" />,
      },
      {
        path:'/muffins',
        element:<CategoryPage category="Muffins" />,
      },
      {
        path:'/puddings',
        element:<CategoryPage category="Puddings" />,
      },
      {
        path:'/drinks',
        element:<CategoryPage category="Drinks" />,
      },
      {
        path:'/brownies',
        element:<CategoryPage category="Brownies" />,
      },
      {
        path:'/macarons',
        element:<CategoryPage category="Macarons" />,
      },
      {
        path:'/waffles',
        element:<CategoryPage category="Waffles" />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
