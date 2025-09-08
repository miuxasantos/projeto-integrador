import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false); 
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() =>{
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(userData && token){
            try {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            } catch {
                console.error("Não há nada para ler no localStorage");
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []); 


    const login = ({ user, token }) => {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;