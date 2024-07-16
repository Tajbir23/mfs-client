import { createBrowserRouter } from "react-router-dom";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/dashboard/dashboard";
import ProtectedRoute from "./ProtectedRoute";

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
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
])

export default router