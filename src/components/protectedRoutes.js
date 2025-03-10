import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check if user is authenticated
    const userRole = localStorage.getItem("Role"); // Get user role from localStorage
    
    if (!isAuthenticated) {
        return <Navigate to="/" />; // Redirect to login if not authenticated
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // If the user is authenticated but their role is not allowed, redirect them to an unauthorized page
        return <Navigate to="/unauthorized" />;
    }

    // If authenticated and role is allowed, render the protected route
    return <Outlet />;
};

export default ProtectedRoutes;
