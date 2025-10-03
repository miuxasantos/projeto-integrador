import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false); 
    const [ usuario, setUsuario ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ token, setToken ] = useState(null);

    useEffect(() =>{
        const checkAuth = () => {
            const usuarioData = localStorage.getItem("usuario");
            const tokenStored = localStorage.getItem("token");

            if(usuarioData && tokenStored){
                try {
                    setUsuario(JSON.parse(usuarioData));
                    setToken(tokenStored)
                    setIsAuthenticated(true);

                } catch {
                    console.error("Não há nada para ler no localStorage");
                    setUsuario(null);
                    setIsAuthenticated(false);
                    setToken(null);
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("token");
                } finally {
                    setLoading(false);
                }
            }    
        }

        checkAuth();
    }, []);

    const login = useCallback(({ usuario: usuario, token: token}) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setToken(token);
        setUsuario(usuario);
        setIsAuthenticated(true);
        setLoading(false);
        return Promise.resolve();
    }, []);

    const logout = useCallback(() => {
        setUsuario(null);
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, usuario, token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;