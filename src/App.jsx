import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import RegisterPage from './pages/account/Register'
import LoginPage from './pages/account/Login'
import ProductDetailsPage from './pages/ProductDetails'
import { productsLoader } from './loaders/ProductLoader'
import ErrorsPage from './pages/errors/Errors'
import ServerErrorPage from './pages/errors/ServerError'
import NotFoundPage from './pages/errors/NotFoundError'
import { useEffect, useState } from 'react'
import requests from './api/apiClient'
import { useCartContext } from './context/cartContext'
import CartPage from './pages/cart/Cart.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, setCart } from './pages/cart/cartSlice.jsx'
import { getUser, logout, setUser } from './pages/account/accountSlice.jsx'
import MainLayout from "./layouts/MainLayout"
import Loading from './components/Loading.jsx'
import CheckoutPage from './pages/checkout/Checkout.jsx'
import AuthGuard from './pages/auth/AuthGuard.jsx'
import OrdersPage from './pages/orders/Orders.jsx'


export const router = createBrowserRouter([
  {
    path: "/", element: <MainLayout />, children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products", id: "products", children: [
          { index: "true", element: <ProductsPage />, },
          { path: ":id", element: <ProductDetailsPage /> },
        ]
      },
      {
        path: "/errors", children: [
          { index: true, element: <ErrorsPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> }
        ]
      },
      { path: "*", element: <NotFoundPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <AuthGuard />, children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/orders", element: <OrdersPage /> },
        ]
      }
    ]
  }

])

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const initApp = async () => {
    await dispatch(getUser())
    await dispatch(getCart())
  }
  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
