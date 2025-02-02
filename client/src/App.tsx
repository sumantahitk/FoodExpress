

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
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
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'
import { useThemeStore } from './store/useThemeStore'

// import { Button } from './components/ui/button'

const ProtectedRoutes=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated,user}=useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.isVerified){
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}

const AuthenticatedUser=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated,user} =useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
}

const AdminRoute=({children}:{children:React.ReactNode})=>{
  const {isAuthenticated,user} =useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/" replace/>
  }
  return children;
}

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<ProtectedRoutes><MainLayout/></ProtectedRoutes>,
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
      element:<AdminRoute><Restaurant/></AdminRoute>,
     },
     {
      path:"/admin/menu",
      element:<AdminRoute><AddMenu/></AdminRoute>,
     },
     {
      path:"/admin/order",
      element:<AdminRoute><Order/></AdminRoute>,
     }
    ]
  },{
    path:"/login",
    element:<AuthenticatedUser><Login/></AuthenticatedUser>
  }
  ,{
    path:"/signup",
    element:<AuthenticatedUser><Signup/></AuthenticatedUser>
  }
  ,{
    path:"/forgot-password",
    element:<AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
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
  const initializeTheme=useThemeStore((state:any)=>state.initializeTheme)
  const {checkAuthentication,isCheckingAuth} = useUserStore();
  //checking auth every time when page is load
  useEffect(()=>{
    checkAuthentication();
    initializeTheme();
  },[checkAuthentication])
  if(isCheckingAuth)
  {
    return <Loading/>
  }
  return (
   <main>
    <RouterProvider router={appRouter}>

    </RouterProvider>
   </main>
  )
}

export default App
