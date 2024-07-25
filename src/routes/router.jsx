import { createBrowserRouter } from "react-router-dom";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/dashboard/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserManage from "../components/dashboard/admin/UserManage";
import Transaction from "../components/dashboard/Transaction";
import Home from "../components/Home";
import ManageTransaction from "../components/dashboard/agent/ManageTransaction"
import AgentRoute from "./AgentRoute";
import SystemMonitor from "../components/dashboard/admin/SystemMonitor";
import Details from "../components/dashboard/admin/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
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
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Transaction />
            },
            {
                path: "manage_user",
                element: <AdminRoute><UserManage /></AdminRoute>
            },
            {
                path: "manage_transactions",
                element: <AgentRoute><ManageTransaction /></AgentRoute>
            },
            {
                path: 'system_monitoring',
                element: <AdminRoute><SystemMonitor /></AdminRoute>
            },
            {
                path: 'details/:id/:name',
                element: <AdminRoute><Details/></AdminRoute>
            }
        ]
    }
])

export default router