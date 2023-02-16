import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import SignUp from "./views/SignUp";
import User from "./views/User";
const router  = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/user'} />
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />        
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },   
    {
        path: '*',
        element: <NotFound />
    }
])
export default router;