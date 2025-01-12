

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from "./auth/Login"

import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'

import MainLayout from './layout/MainLayout'
import HeroSection from './components/HeroSection'
import Profile from './components/Profile'
import SearchText from './components/SearchPage'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import Order from './admin/Order'
import Success from './components/Success'

// import { Button } from './components/ui/button'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
     {
      path:"/",
      element:<HeroSection/>,
     },
     {
      path:"/profile",
      element:<Profile/>,
     },
     {
      path:"/search/:text",
      element:<SearchText/>,
     },
     {
      path:"/restaurant/:id",
      element:<RestaurantDetails/>,
     },
     {
      path:"/cart",
      element:<Cart/>,
     },
     {
      path:"/order/status",
      element:<Success/>,
     },
     //admin service start from here
     {
      path:"/admin/restaurant",
      element:<Restaurant/>,
     },
     {
      path:"/admin/menu",
      element:<AddMenu/>,
     },
     {
      path:"/admin/order",
      element:<Order/>,
     }
    ]
  },{
    path:"/login",
    element:<Login/>
  }
  ,{
    path:"/signup",
    element:<Signup/>
  }
  ,{
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
  },
  {
    path:"/verify-email",
    element:<VerifyEmail/>
  }
])
function App() {


  return (
   <main>
    <RouterProvider router={appRouter}>

    </RouterProvider>
   </main>
  )
}

export default App
