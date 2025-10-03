import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext/useAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading, token } = useAuth();

    if(loading) {
    console.log("⏳ PRIVATE ROUTE: Mostrando Carregando...");
        return <p>Carregando...</p>;
    }

    if (!isAuthenticated || !token) {
        console.log("❌ PRIVATE ROUTE: Redirecionando para /auth");
        return <Navigate to="/auth" />;
    }

    return children;
};

export default PrivateRoute;