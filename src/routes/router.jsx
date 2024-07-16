import { createBrowserRouter } from "react-router-dom";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import Dashboard from "../layout/Dashboard";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
])

export default router