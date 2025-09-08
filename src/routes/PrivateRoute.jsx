import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext/useAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return <p>Carregando...</p>;
    }

    return isAuthenticated ? children : <Navigate to="/auth" />
};

export default PrivateRoute;