import './App.css'
import Login from './Componentes/Login/Login';
import { Outlet, Navigate } from 'react-router-dom';
import Navb from './Componentes/Navbar';
import useAuth from './context/AuthContext/useAuth';
import Footer from "./Componentes/Footer";

function App() {
  const { isAuthenticated, usuario, logout } = useAuth();
  

  return (
    <>
      <div className="app">
        <div className="container">
          {isAuthenticated ? <Navb usuario={usuario} onLogOut={logout}/> : ""}
        </div>
        <div className="container">
          <Outlet />
        </div>
      </div>
        <Footer />
    </>
  );
}

export default App;
