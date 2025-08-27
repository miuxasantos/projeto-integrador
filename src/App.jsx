import './App.css'
import Login from './Componentes/Login/Login';
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navb from './Componentes/Navbar';

function App() {

  const [isAuthenticated, setiIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if(token && userData){
      setiIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setiIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setiIsAuthenticated(false);
    setUser(null);
  }

  if(loading){
    return <div className='loading'>Carregando...</div>
  }

  if(!isAuthenticated && window.location.pathname !== '/auth') {
    return <Navigate to='/auth' replace />;
  }

  if(isAuthenticated && window.location.pathname === '/auth'){
    return <Navigate to='/' replace />;
  }

  return (
    <div className="app">
      <div className="container">
        {isAuthenticated ? <Navb user={user} onLogOut={handleLogOut}/> : <p>Favor realizar seu login!</p>}
      </div>
      <div className="container">
        <Outlet context={{user, onLogOut: handleLogOut, onLoginSuccess: handleLoginSuccess}}/>
      </div>
    </div>
  );
}

export default App;
